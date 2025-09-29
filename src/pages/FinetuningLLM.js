import React from 'react';
import './WritingPage.css';

const FinetuningLLM = () => {
  return (
    <div className="writing-page">
      <div className="writing-container">
        <nav className="writing-nav">
          <a href="/" className="back-link">← Back to Home</a>
        </nav>
        <header className="writing-header">
          <h1>Fine-Tuning Llama on My iMessage Data</h1>
          <div className="writing-meta">
            <span className="writing-date">2025</span>
          </div>
        </header>
        
        <article className="writing-content">
          <p>
            Large language models are generalists: they've read most of the internet, but they don't know how you text. I wanted to see if I could make Llama reply like me, using only my own iMessage history. This is a short write-up of the pipeline I built, how I fine-tuned, and what came out of it.
          </p>
          
          <h2>Data extraction</h2>
          <p>
            Apple doesn't make this easy. iMessages live in an SQLite database (sms.db) inside an iPhone backup. I pulled this out along with my contacts (contacts.vcf). The main work was cleaning:
          </p>
          <ul>
            <li>Normalizing Apple's odd timestamp formats</li>
            <li>Replacing placeholders for attachments/emojis</li>
            <li>Mapping handle_ids back to human-readable names</li>
          </ul>
          <p>
            After filtering to only my messages, I ended up with ~263k raw messages. Coalescing consecutive texts into turns gave ~56k usable dialogue examples.
          </p>
          <p>
          </p>
          
          <h2>Dataset construction</h2>
          <p>
            The goal wasn't just to replay text but to capture conversational turns. I wrote a pipeline that:
          </p>
          <ul>
            <li>Groups messages into sessions with a gap threshold (e.g. 4 hours).</li>
            <li>Builds JSONL entries where context messages form the input, and my reply is the label.</li>
            <li>Tokenizes with Llama-3.1's tokenizer.</li>
          </ul>
          <p>
            The result: a finetune dataset that feels like chat logs.
          </p>
          <p>
          </p>
          
          <h2>Training</h2>
          <p>
            I used <a href="https://github.com/unslothai/unsloth" target="_blank" rel="noopener noreferrer">Unsloth</a> with QLoRA (parameter-efficient fine-tuning). Model: Llama-3.1-8B-Instruct. Hardware: a rented A100 GPU from Lambda.
          </p>
          <p>Key stats:</p>
          <ul>
            <li>Trainable parameters: ~0.5% (~42M)</li>
            <li>Epochs: 20–30 (early stopping around validation loss plateau)</li>
            <li>Batch size: 64 (via gradient accumulation)</li>
            <li>Loss started around ~3.9 and converged below ~0.5.</li>
          </ul>
          <p>
          </p>
          
          <h2>Inference</h2>
          <p>
            Loading the adapter weights back into Llama-3.1, I could chat with "me-as-a-model." The replies had my tone—short, casual, sometimes with the exact quirks I use when texting friends.
          </p>
          <p>Example:</p>
          <div className="code-block">
            <p><strong>Prompt:</strong> "yo u free to hoop later?"</p>
            <p><strong>Baseline Llama-3.1:</strong> "Yes, I should be available later today. What time were you thinking?"</p>
            <p><strong>My finetuned model:</strong> "yea after 6 works"</p>
          </div>
          <p>
          </p>
        </article>
        
        <footer className="writing-footer">
        </footer>
      </div>
    </div>
  );
};

export default FinetuningLLM;
