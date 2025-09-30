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
            For a fun weekend project, I decided to finetune an llm on all of my iMessage data to see if I could get it to sound like me.
          </p>
          
          <p>
            I decided to use Metas Llama 3.1 8B as my base model and QLoRA for finetuning. I was able to run it on a rented A100 GPU from Lambda and trained on my iMessage data in 4 hours.
          </p>
          
          
          <h2>Data: turns, sessions, and token budgets</h2>
          <p>
            I first downloaded my iMessage exports from Apple by taking an unencrpyted backup of my phone and then cleaned and normalized the data. Raw iMessage exports are chaos. You get Apple timestamps, empty bubbles, attachments that resolve into invisible characters. If you train on that raw, the model learns nonsense. So step one was cleaning and normalizing.
          </p>
          
          <p>I:</p>
          <ul>
            <li>extracted messages and replaced attachment-only bubbles with placeholders like <code>&lt;IMAGE&gt;</code> or <code>&lt;LINK&gt;</code></li>
            <li>mapped handles to names (since "+1408555…" is not useful context)</li>
            <li>coalesced bursts of texts into "turns" (so five half-sentences don't count as five separate replies)</li>
            <li>grouped turns into "sessions" to preserve conversational arcs</li>
          </ul>
          
          <p>Here's the function that coalesces bursts of texts into turns using a time gap:</p>
          
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
{`def coalesce_turns(df: pd.DataFrame, turn_gap_hours: float) -> pd.DataFrame:
    gap = pd.Timedelta(hours=turn_gap_hours)
    all_turns = []

    for tid, g in df.groupby("thread_id", sort=False):
        g = g.sort_values("ts").reset_index(drop=True)
        cur = None
        for _, r in g.iterrows():
            spk = r["speaker"]
            txt = (r["text"] or "").strip()
            t = r["ts"]
            if not txt:
                continue
            new_turn = (cur is None) or (spk != cur["speaker"]) or (t - cur["end"] > gap)
            if new_turn:
                if cur is not None:
                    all_turns.append(cur)
                cur = {
                    "thread_id": tid,
                    "thread_title": r.get("thread_title", None),
                    "is_one_to_one": bool(r.get("is_one_to_one", False)),
                    "speaker": spk,
                    "is_you": (spk == "__YOU__"),
                    "texts": [txt],
                    "start": t,
                    "end": t,
                }
            else:
                cur["texts"].append(txt)
                cur["end"] = t
        
        if cur is not None:
            all_turns.append(cur)
    
    dft = pd.DataFrame(all_turns)
    dft["text"] = dft["texts"].apply(lambda xs: "\\n".join(xs))
    dft = dft.drop(columns=["texts"]).sort_values(["thread_id","start"]).reset_index(drop=True)
    return dft`}
            </SyntaxHighlighter>
          </div>
          
          <p>
            Finally, when building examples, I made them token-aware: walk back through turns until the context window is nearly full, but not over budget. That keeps enough history to be meaningful while staying cheap.
          </p>
          
          <h2>Charts</h2>
          <p>
            Before training, since I had all this data I thought I might as well plot some charts for my own enjoyment. So I made a chart to see how many texts I sent every year since 2016.
          </p>
          
          <p>Code for the chart:</p>
          
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
    plt.bar(yearly_counts['year'], yearly_counts['count'], color='#3498db')
    plt.title('Number of Texts I Sent Over Time')
    plt.xlabel('Year')
    plt.ylabel('Number of Texts Sent')
    plt.tight_layout()
    plt.savefig('data/charts/chart1_texts_over_time.png')
    plt.close()`}
            </SyntaxHighlighter>
          </div>
          
          <div className="chart-container">
            <img 
              src="/chart1_texts_over_time.png" 
              alt="Chart showing number of texts sent over time from 2016 onwards" 
              className="chart-image"
            />
          </div>
          
          <h2>Safety: redact ahead of time</h2>
          <p>
            Texts are personal. Before dataset assembly, I ran a redactor to scrub URLs, emails, phone numbers, and common sensitive words. Placeholders like <code>&lt;URL&gt;</code> and <code>&lt;EMAIL&gt;</code> remain, so the model knows how to respond to them without memorizing the originals.
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
          
          <h2>QLoRA: small deltas, big vibes</h2>
          <p>
            The base model (Llama 3.1 8B) stays frozen. QLoRA bolts on tiny trainable adapters that tweak style without retraining billions of parameters. That's why this worked in a weekend on a rented single GPU instead of a lab cluster.
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
    bias="none",
)`}
            </SyntaxHighlighter>
          </div>
          
          <h2>Training curves</h2>
          <p>
            While training, I tracked train loss and eval loss. Loss is basically "how surprised is the model by this data?" Lower is better, but the shape matters more than the absolute value.
          </p>
          
          <p>
            <strong>Train loss:</strong> started around 1.3, dropped under 0.8, then wiggled a bit (expected for small runs).
          </p>
          
          <p>
            <strong>Eval loss:</strong> started ~0.91 and fell steadily toward ~0.85, smooth without spikes.
          </p>
          
          <p>
            That's the Goldilocks zone: not overfitting, not underfitting, just enough to pick up texting style.
          </p>
          
          <div className="chart-container">
            <img 
              src="/training.png" 
              alt="Training curves showing train loss and eval loss over time" 
              className="chart-image"
            />
          </div>
          
          <h2>Inference: load base, snap on adapters, chat</h2>
          <p>
            Once the adapters were trained, inference was simple: load the 4-bit base, snap on the LoRA adapters, and start chatting. The block that matters is short:
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
          
          <p>
            Wrap it with a chat loop, keep a rolling history, and you've got a model that replies in your texting style.
          </p>
          
          <div className="chart-container">
            <img 
              src="/inference-example.png" 
              alt="Inference example showing the model chatting in my texting style" 
              className="chart-image"
            />
          </div>
          
          {/* <h2>Results</h2>
          <p>
            After just two epochs, the model started sounding like me—short, casual replies, with the right mix of "haha" and "lol," and placeholder-aware behavior when an <code>&lt;IMAGE&gt;</code> or <code>&lt;LINK&gt;</code> showed up.
          </p>
          
          <p>
            No giant GPUs, no weeks of training. Just a clean dataset, small deltas, and a weekend of hacking.
          </p> */}
        </article>
        
        <footer className="writing-footer">
        </footer>
      </div>
    </div>
  );
};

export default FinetuningLLM;
