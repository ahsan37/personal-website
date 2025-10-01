import React from 'react';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './WritingPage.css';

const FinetuningLLM = () => {
  return (
    <div className="writing-page">
      <div className="writing-container">
        <nav className="writing-nav">
          <Link to="/" className="back-link">← Back to Home</Link>
        </nav>
        <header className="writing-header">
          <h1>Fine-Tuning Llama on My iMessage Data</h1>
          <div className="writing-meta">
            <span className="writing-date">2025</span>
          </div>
        </header>
        
        <article className="writing-content">
          <p>
            For a fun weekend project, I decided to finetune an LLM on all of my iMessage data to see if I could get a model to convincingly impersonate me.
          </p>
          
          <p>
            I used Meta's Llama 3.1-8B as my base model and QLoRA for finetuning. I was able to train it on a rented H100 GPU from Lambda in under 1 hour.
          </p>
          
          <h2>First Step: iMessage Data</h2>
          <p>
            I first downloaded my iMessage exports from Apple by taking an unencrypted backup of my phone and then cleaned and normalized the data. Raw iMessage exports contain a lot of information not needed for this project.
          </p>
          
          <p>This involved:</p>
          <ul>
            <li>Extracting messages and replacing attachment only bubbles with placeholders like <code>&lt;IMAGE&gt;</code> or <code>&lt;LINK&gt;</code> (since I was not training a multimodal model)</li>
            <li>Mapping numbers to names by exporting my contact list and canonicalizing</li>
          </ul>
          
          <p>Here's the SQL query I used to get messages from the iCloud messages backup:</p>
          
          <div className="code-block">
            <SyntaxHighlighter 
              language="sql" 
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '0.9rem',
                padding: '20px'
              }}
            >
{`query = """
WITH msg AS (
  SELECT
    m.ROWID                              AS message_id,
    CASE
        WHEN m.is_from_me = 0 THEN h.id
        WHEN m.is_from_me = 1 THEN COALESCE(c.chat_identifier, c.guid)
        ELSE h.id
    END                                  AS handle,
    m.is_from_me                         AS is_from_me,
    m.text                               AS original_text,
    COALESCE(c.chat_identifier, c.guid)  AS thread_id,
    c.display_name                       AS thread_name,
    CASE WHEN m.date > 1000000000000
         THEN (m.date/1000000000) + 978307200
         ELSE m.date + 978307200
    END                                   AS ts_unix,
    CASE WHEN maj.message_id IS NOT NULL THEN 1 ELSE 0 END AS has_attachments,
    GROUP_CONCAT(a.mime_type) AS attachment_types,
    GROUP_CONCAT(a.filename) AS attachment_filenames
  FROM message m
  JOIN chat_message_join cmj ON cmj.message_id = m.ROWID
  JOIN chat c                ON c.ROWID       = cmj.chat_id
  LEFT JOIN handle h         ON h.ROWID       = m.handle_id
  LEFT JOIN message_attachment_join maj ON maj.message_id = m.ROWID
  LEFT JOIN attachment a     ON a.ROWID       = maj.attachment_id
  WHERE
    ((m.text IS NOT NULL AND TRIM(m.text) <> '') OR maj.message_id IS NOT NULL)
    AND (m.associated_message_type IS NULL OR m.associated_message_type = 0)
  GROUP BY m.ROWID, m.is_from_me, m.text, c.chat_identifier, c.guid, c.display_name, m.date, h.id
)
SELECT *
FROM msg
ORDER BY thread_id, ts_unix;
"""`}
            </SyntaxHighlighter>
          </div>
          
          <h2>Step Two: Charts</h2>
          <p>
            Before diving into training, I first spent too many hours than I would like to admit randomly selecting a month and a year and reading whatever first set of messages popped up - it was quite fun! Then I decided to make some charts to visualize all this data. I made a chart to see how many texts I sent every year since 2016, top 30 contacts I've ever texted ranked by # of messages, and contact I texted the most every year.
          </p>
          
          <div className="code-block">
            <SyntaxHighlighter 
              language="python" 
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '0.9rem',
                padding: '20px'
              }}
            >
{`def chart1_texts_over_time(df):
    my_messages = df[df['is_from_me'] == 1]
    yearly_counts = my_messages.groupby('year').size().reset_index(name='count')
   
    plt.figure(figsize=(12, 7))
    bars = plt.bar(yearly_counts['year'], yearly_counts['count'],
                   color='#3498db', alpha=0.8, edgecolor='#2c3e50', linewidth=1.5, width=0.6)
   
    plt.title('Number of Texts I Sent Over Time', fontsize=18, fontweight='bold', pad=25, color='#2c3e50')
    plt.xlabel('Year', fontsize=14, fontweight='semibold', color='#34495e')
    plt.ylabel('Number of Texts Sent', fontsize=14, fontweight='semibold', color='#34495e')
   
    # Add value labels on bars
    for bar, count in zip(bars, yearly_counts['count']):
        plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + max(yearly_counts['count']) * 0.02,
                f'{count:,}', ha='center', va='bottom', fontweight='bold', fontsize=11, color='#2c3e50')`}
            </SyntaxHighlighter>
          </div>
          
          <div className="chart-container">
            <img 
              src="/chart1_texts_over_time.png" 
              alt="Chart showing number of texts sent over time from 2016 onwards" 
              className="chart-image"
            />
          </div>
          
          <div className="code-block">
            <SyntaxHighlighter 
              language="python" 
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '0.9rem',
                padding: '20px'
              }}
            >
{`def chart2_top_contacts(df):
    my_messages = df[df['is_from_me'] == 1]
    contact_counts = my_messages.groupby('name').size().reset_index(name='count')
    top_contacts = contact_counts.sort_values('count', ascending=True).tail(30)
    
    plt.figure(figsize=(14, 12))
    colors = plt.cm.plasma(np.linspace(0.2, 0.9, len(top_contacts)))
    bars = plt.barh(range(len(top_contacts)), top_contacts['count'], 
                   color=colors, alpha=0.8, edgecolor='#2c3e50', linewidth=0.8)
    
    plt.yticks(range(len(top_contacts)), top_contacts['name'], fontsize=11)
    plt.title('Top 30 People I\\'ve Texted Most Often', fontsize=18, fontweight='bold', pad=25, color='#2c3e50')
    
    # Add value labels
    for i, v in enumerate(top_contacts['count']):
        plt.text(v + max(top_contacts['count']) * 0.02, i, 
                f'{v:,}', ha='left', va='center', fontweight='bold', fontsize=10, color='#2c3e50')`}
            </SyntaxHighlighter>
          </div>
          
          <div className="chart-container">
            <img 
              src="/chart2_top_contacts_redacted.png" 
              alt="Chart showing top 30 contacts I've texted most often" 
              className="chart-image"
            />
          </div>
          
          <div className="code-block">
            <SyntaxHighlighter 
              language="python" 
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '0.9rem',
                padding: '20px'
              }}
            >
{`def chart3_yearly_top_contacts(df):
    my_messages = df[df['is_from_me'] == 1]
    
    yearly_top = []
    for year in sorted(my_messages['year'].unique()):
        year_data = my_messages[my_messages['year'] == year]
        if len(year_data) > 0:
            top_contact = year_data.groupby('name').size().idxmax()
            count = year_data.groupby('name').size().max()
            yearly_top.append({'year': year, 'name': top_contact, 'count': count})
    
    yearly_top_df = pd.DataFrame(yearly_top)
    unique_names = yearly_top_df['name'].unique()
    colors = plt.cm.tab20(np.linspace(0, 1, len(unique_names)))
    name_color_map = dict(zip(unique_names, colors))
    
    plt.figure(figsize=(15, 9))
    for i, row in yearly_top_df.iterrows():
        plt.bar(row['year'], row['count'], 
               color=name_color_map[row['name']], 
               alpha=0.8, edgecolor='#2c3e50', linewidth=1.2, width=0.6)`}
            </SyntaxHighlighter>
          </div>
          
          <div className="chart-container">
            <img 
              src="/chart3_yearly_top_contacts_redacted.png" 
              alt="Chart showing the contact I texted most each year" 
              className="chart-image"
            />
          </div>
          
          <h2>Step Three: Training Dataset</h2>
          <p>
            I didn't want to train the model on all available message data because then it would be generalized to sound like an average of my conversational style over the past 9 years so I chose to only include data from the past ~3 years (this also prevents overfitting on the excess number of texts between 2 ex gfs). Since I planned to send the model to some friends and potentially even host it online for public use, I ran a redactor to scrub URLs, emails, phone numbers, and common sensitive words. Placeholders like <code>&lt;URL&gt;</code> and <code>&lt;EMAIL&gt;</code> remain, so the model knows how to respond to them without memorizing the originals.
          </p>
          
          <div className="code-block">
            <SyntaxHighlighter 
              language="python" 
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '0.9rem',
                padding: '20px'
              }}
            >
{`def redact_text(t: str) -> str:
    t = URL_RE.sub("<URL>", t)
    t = EMAIL_RE.sub("<EMAIL>", t)
    t = PHONE_RE.sub("<PHONE>", t)
    for word in DEFAULT_REDACT_WORDS:
        t = re.sub(rf"\\b{re.escape(word)}\\b", "<REDACTED>", t, flags=re.IGNORECASE)
    return t`}
            </SyntaxHighlighter>
          </div>
          
          <p>
            With the data clean, the next step was shaping it into conversations the way people actually text. I merge nearby "bubbles" into turns (one person's continuous message), group turns into sessions if they're within 3 days of each other, and then feed the model up to 2048 tokens of context (saving ~200 tokens for my reply and ~64 for overhead) with at most 12 past turns if they're recent (within 12 hours).
          </p>
          
          <div className="code-block">
            <SyntaxHighlighter 
              language="python" 
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '0.9rem',
                padding: '20px'
              }}
            >
{`if (cur is None) or (spk != cur["speaker"]) or (t - cur["end"] > gap):
    # new turn starts
    cur = {"speaker": spk, "texts": [txt], "start": t, "end": t}
else:
    # same turn, append bubble
    cur["texts"].append(txt)
    cur["end"] = t`}
            </SyntaxHighlighter>
          </div>
          
          <h2>Step Four: Fine-tuning with QLoRA + Unsloth</h2>
          <p>
            I trained the model with Unsloth, which makes QLoRA really easy. QLoRA basically means I didn't have to update all 8B parameters of the model since it's unnecessary for this task. I used the 8B Llama-3.1 model in 4-bit precision to fit on a single rented GPU.
          </p>
          
          <p>
          The setup matched my dataset: 2048 tokens max length, with packing turned on. I am no AI Researcher so most of the params were chosen off of vibes and light googling. The LoRA settings (r=16, alpha=32) are pretty standard and training itself was light: 2 epochs, an effective batch size of 32 , and a learning rate of 1e-4 with a cosine schedule. Supposedly just enough to teach the model how I text without overfitting.
          </p>
          
          <div className="code-block">
            <SyntaxHighlighter 
              language="python" 
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '0.9rem',
                padding: '20px'
              }}
            >
{`# load base model in 4-bit
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="meta-llama/Meta-Llama-3.1-8B-Instruct",
    load_in_4bit=True,
    dtype=torch.bfloat16,
    use_gradient_checkpointing=True,
)

# attach LoRA adapters
model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    lora_alpha=32,
    lora_dropout=0.0,
    target_modules=["q_proj","k_proj","v_proj","o_proj","gate_proj","up_proj","down_proj"],
    bias="none",)`}
            </SyntaxHighlighter>
          </div>
          
          <h3>Training curves</h3>
          <p>
            While training, I tracked train loss and eval loss. Loss is basically "how surprised is the model by this data?" Lower is better, but the shape matters more than the absolute value.
          </p>
          
          <p>
            <strong>Train loss:</strong> started around 1.3, dropped under 0.8, then wiggled a bit (expected for small runs).
          </p>
          
          <p>
            <strong>Eval loss:</strong> started ~0.91 and fell steadily toward ~0.85, smooth without spikes.
          </p>
          
          <div className="chart-container">
            <img 
              src="/training.png" 
              alt="Training curves showing train loss and eval loss over time" 
              className="chart-image"
            />
          </div>
          
          <h2>Step 5: Inference</h2>
          <p>
          Once the adapters were trained, I put the model on Hugging Face and ran inference via a rented A100 GPU from Lambda.
          </p>
          
          <div className="code-block">
            <SyntaxHighlighter 
              language="python" 
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: '8px',
                fontSize: '0.9rem',
                padding: '20px'
              }}
            >
{`from unsloth import FastLanguageModel
from peft import PeftModel

def load_model(base, adapters, dtype="bfloat16", load_in_4bit=True):
    model, tokenizer = FastLanguageModel.from_pretrained(
        model_name=base,
        load_in_4bit=load_in_4bit,
        dtype=getattr(torch, dtype),
        use_gradient_checkpointing=False,
    )
    model = PeftModel.from_pretrained(model, adapters)
    model.eval()
    if tokenizer.pad_token_id is None and tokenizer.eos_token_id is not None:
        tokenizer.pad_token = tokenizer.eos_token
    return model, tokenizer`}
            </SyntaxHighlighter>
          </div>
          
          <div className="chart-container">
            <img 
              src="/inference-example.png" 
              alt="Inference example showing the model chatting in my texting style" 
              className="chart-image"
            />
          </div>
          
          <p>
          Overall the model worked quite well! I was pretty surprised at how well it captured a lot of the nuances in the way I text. Granted it felt like I was talking to a nonchalant version of me from college. The next step will probably be playing around with some params and how I format the data and then hosting it on twilio and sharing it with friends!
          </p>
        </article>
        
        <footer className="writing-footer">
        </footer>
      </div>
    </div>
  );
};

export default FinetuningLLM;
