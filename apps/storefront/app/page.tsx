"use client";

import { useEffect, useRef, useState } from "react";

type Item = { design: number; size: string; quantity: number };
const sizes = ["S", "M", "L", "XL", "XXL"];
const designs = [1, 2, 3];
const label = (id: number) => `Shirt ${String(id).padStart(2, "0")}`;

export default function HomePage() {
  const [bag, setBag] = useState<Item[]>([]);
  const [selected, setSelected] = useState(1);
  const [size, setSize] = useState("");
  const [notice, setNotice] = useState("");
  const [step, setStep] = useState<"bag" | "details" | "review">("bag");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ready, setReady] = useState(false);
  const productDialog = useRef<HTMLDialogElement>(null);
  const bagDialog = useRef<HTMLDialogElement>(null);
  const count = bag.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem("brand-bag-v1") || "[]");
      if (Array.isArray(stored)) setBag(stored.filter((item): item is Item => item && designs.includes(item.design) && sizes.includes(item.size) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 10).slice(0, 15));
    } catch { /* A blocked or invalid store starts with an empty bag. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) try { localStorage.setItem("brand-bag-v1", JSON.stringify(bag)); } catch { /* The bag still works in memory. */ }
  }, [bag, ready]);

  function add() {
    if (!size) { setNotice("Choose a size first."); return; }
    setBag(current => {
      const found = current.find(item => item.design === selected && item.size === size);
      return found ? current.map(item => item === found ? { ...item, quantity: Math.min(10, item.quantity + 1) } : item) : [...current, { design: selected, size, quantity: 1 }];
    });
    productDialog.current?.close();
    setNotice(`${label(selected)}, size ${size}, added to your bag.`);
  }
  function change(index: number, delta: number) {
    setBag(current => current.map((item, i) => i === index ? { ...item, quantity: Math.min(10, item.quantity + delta) } : item).filter(item => item.quantity > 0));
  }

  return <>
    <a className="skip-link" href="#drop">Skip to the drop</a>
    <div className="announcement">FIRST DROP / CAMPUS EDITION / PREVIEW</div>
    <header className="header"><a className="wordmark" href="#">BRAND<span>®</span></a><nav aria-label="Main navigation"><a href="#drop">The drop</a><a href="#how">How it works</a></nav><button className="bag-link" onClick={() => { setStep("bag"); bagDialog.current?.showModal(); }}>Bag <span>{count.toString().padStart(2, "0")}</span></button></header>
    <main>
      <section className="hero"><div className="eyebrow">DROP 001 — MADE FOR OUR CAMPUS</div><h1>Your campus.<br/><span>Your first drop.</span></h1><div className="hero-bottom"><p>Three shirts. One first chapter.<br/>Preorder yours. We make them after orders close.</p><a className="button" href="#drop">Explore the drop</a></div><div className="edition" aria-hidden="true">001</div></section>
      <section className="collection" id="drop"><div className="section-heading"><div><p className="eyebrow">THE FIRST THREE</p><h2>Small start. Yours first.</h2></div><p>Designs arriving soon</p></div>
        <div className="product-grid">{designs.map(id => <article className="product" key={id}><button className={`product-art tone-${id}`} aria-label={`View ${label(id)}`} onClick={() => { setSelected(id); setSize(""); setNotice(""); productDialog.current?.showModal(); }}><span className="art-top">DROP 001 <span>0{id} / 03</span></span><span className="art-number">0{id}</span><span className="art-caption">DESIGN TO BE REVEALED</span></button><div className="product-heading"><h3>{label(id)}</h3><span>Price coming soon</span></div><p>Preorder · Made after orders close</p></article>)}</div>
        <p className="preview-note">A first look at the store. Shirt designs, prices, available sizes and launch dates will be confirmed before preorders open.</p>
      </section>
      <section className="process" id="how"><div><p className="eyebrow">GOOD THINGS TAKE A LITTLE TIME</p><h2>Ordered first.<br/>Made for you.</h2></div><ol><li><span>01</span><div><h3>Pick your shirt</h3><p>Choose your design and size once the drop opens.</p></div></li><li><span>02</span><div><h3>Pay upfront</h3><p>Full payment secures your preorder. Production starts after orders close.</p></div></li><li><span>03</span><div><h3>We’ll be in touch</h3><p>We’ll contact you on your phone to arrange getting your shirt to you.</p></div></li></ol></section>
      <section className="questions"><h2>Before you order.</h2><div><details><summary>When will I get my shirt?</summary><p>The production timeline and estimated ready date will be published before we accept preorders.</p></details><details><summary>How do I choose my size?</summary><p>Final sizes and garment measurements will be added with the designs. The size buttons in this preview are examples.</p></details><details><summary>Do I need to enter an address?</summary><p>No. For this first campus drop, we’ll coordinate with you directly using your phone number.</p></details><details><summary>Can I change or cancel my order?</summary><p>The cancellation, size-change and refund terms will be available before preorders open.</p></details></div></section>
    </main><footer><a className="wordmark" href="#">BRAND<span>®</span></a><p>DROP 001 / THE BEGINNING</p><a href="#drop">Back to the drop</a></footer>
    <p className="sr-only" role="status">{notice}</p>
    <dialog ref={productDialog} className="product-dialog"><div className="dialog-top"><span className="eyebrow">DROP 001 / PREVIEW</span><button aria-label="Close product" onClick={() => productDialog.current?.close()}>Close</button></div><div className={`detail-art tone-${selected}`}><span>0{selected}</span><p>DESIGN TO BE REVEALED</p></div><h2>{label(selected)}</h2><p>Price coming soon · Made to preorder</p><fieldset><legend>Choose size <span>(sample sizes)</span></legend><div className="sizes">{sizes.map(value => <button key={value} aria-pressed={size === value} onClick={() => { setSize(value); setNotice(""); }}>{value}</button>)}</div></fieldset><p className="muted">Final fit, fabric and size chart will arrive with the design.</p><p role="status">{notice}</p><button className="button full" onClick={add}>Add to preview bag</button><p className="small-note">Preview only. No order is placed.</p></dialog>
    <dialog ref={bagDialog} className="bag-dialog"><div className="dialog-top"><span className="eyebrow">{step === "bag" ? "YOUR SELECTION" : "PREORDER CHECKOUT"}</span><button onClick={() => bagDialog.current?.close()}>Close</button></div><h2>{step === "bag" ? `Your bag (${count})` : step === "details" ? "A few details." : "Review your preorder."}</h2>
      {count === 0 ? <div className="empty"><p>Your first shirt is waiting.</p><button className="button" onClick={() => bagDialog.current?.close()}>Explore the drop</button></div> : <>
        {step !== "details" && <ul className="bag-items">{bag.map((item, index) => <li key={`${item.design}-${item.size}`}><div className={`bag-art tone-${item.design}`}>0{item.design}</div><div className="bag-item-info"><h3>{label(item.design)}</h3><p>Size {item.size} · Price pending</p>{step === "bag" ? <div className="quantity"><button aria-label={`Decrease ${label(item.design)} size ${item.size}`} onClick={() => change(index, -1)}>−</button><span>{item.quantity}</span><button disabled={item.quantity === 10} aria-label={`Increase ${label(item.design)} size ${item.size}`} onClick={() => change(index, 1)}>+</button><button className="remove" onClick={() => setBag(current => current.filter((_, i) => i !== index))}>Remove</button></div> : <p>Quantity {item.quantity}</p>}</div></li>)}</ul>}
        {step === "bag" && <><div className="total"><span>Total</span><span>Price to be announced</span></div><p className="muted">Full payment at checkout when preorders open.</p><button className="button full" onClick={() => setStep("details")}>Preview checkout</button></>}
        {step === "details" && <form onSubmit={event => { event.preventDefault(); setStep("review"); }}><p>We’ll use these details to contact you about your shirt.</p><label className="field">Full name<input autoComplete="name" required maxLength={100} value={name} onChange={event => setName(event.target.value)} pattern=".*\S.*" /></label><label className="field">Phone number<input type="tel" autoComplete="tel" inputMode="tel" required pattern="[+]?[0-9 ()-]{10,18}" title="Enter a phone number with 10 to 18 characters, using digits, spaces, +, parentheses or hyphens." value={phone} onChange={event => setPhone(event.target.value)} /></label><p className="small-note">Preview details stay in this page and are not submitted.</p><button className="button full" type="submit">Review selection</button><button className="text-button" type="button" onClick={() => setStep("bag")}>Back to bag</button></form>}
        {step === "review" && <><div className="contact-review"><h3>Contact details</h3><p>{name}<br/>{phone}</p><button className="text-button" onClick={() => setStep("details")}>Edit details</button></div><div className="total"><span>Pay in full</span><span>Price pending</span></div><p className="payment-notice">Preorders aren’t open yet. Payment will be available once the designs, prices and launch details are confirmed.</p><button className="button full" disabled>Payment not yet available</button><p className="small-note">No payment taken. No order placed.</p><button className="text-button" onClick={() => setStep("bag")}>Edit bag</button></>}
      </>}
    </dialog>
  </>;
}
