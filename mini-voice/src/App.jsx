import "./App.css";
import { useState } from "react";

function App() {


  const [companyName, setCompanyName] = useState("");
  const dateNow = new Date();
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
  const [invoiceDate, setInvoiceDate] = useState(() => {
  return dateNow.toISOString().split("T")[0]; // YYYY-MM-DD format
  });

  const [currency, setCurrency] = useState("$"); // default to USD
  const [billTo, setBillTo] = useState("");
  const [taxRate, setTaxRate] = useState();
  const [discount, setDiscount] = useState();
  const[items, setItems] = useState([]);
  const[ItemForm, setItemForm] = useState({

    name: "",
    quantity: "",
    price: "",

  });

  function AddItems(){

    const { name, quantity, price } = ItemForm;

    if(ItemForm.name === "" || ItemForm.quantity <= 0 || ItemForm.price <= 0)return alert("Please put proper values.");

    const checkDupe = items.some(item => item.name.toLowerCase() === name.toLowerCase());
      if(checkDupe){
        
        return alert("Item already exists!");
      }

    setItems([
      ...items,
      {
        name: ItemForm.name,
        quantity: Number(ItemForm.quantity),
        price: Number(ItemForm.price),
      }
    ]);

    setItemForm({

      name: "",
      quantity: "",
      price: "",

    });

  }

  function removeItem(index){
    setItems(
      items.filter( (_, i) => i !== index)
    );
  }
  

  const tax = (taxRate || 0) / 100;
  const subtotal = items.reduce((total, item) => total + item.quantity * item.price, 0.00);
  const totalWithDiscount = subtotal - (discount || 0);
  const taxAmt = totalWithDiscount * tax;
  const compTotal = totalWithDiscount + taxAmt;
  
  const Final = compTotal.toFixed(2);

  function validateInvoice() {
  // Check required fields

  if (!companyName.trim()) {
    alert("Please fill in 'Company Name' field.");
    return false;
  }

  if (!billTo.trim()) {
    alert("Please fill in 'Bill To' field.");
    return false;
  }
  
  if (items.length === 0) {
    alert("Please add at least one item.");
    return false;
  }
  
  // Validate tax rate (if entered, should be >= 0)
  if (taxRate && taxRate < 0) {
    alert("Tax rate cannot be negative.");
    return false;
  }
  
  // Validate discount (if entered, should be >= 0)
  if (discount && discount < 0) {
    alert("Discount cannot be negative.");
    return false;
  }
  
  // Validate discount doesn't exceed subtotal
  if (discount > subtotal) {
    alert("Discount cannot exceed subtotal.");
    return false;
  }
  
  return true;
}

  function handlePrint() {
  // Validate before printing
  if (!validateInvoice()) {
    return; // Stop if validation fails
  }
  window.print();
}

  function handleReset() {
  if (window.confirm("Are you sure you want to reset the entire invoice? This will clear all data.")) {
    setCompanyName("");
    setInvoiceNumber(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
    setInvoiceDate(() => {
      return new Date().toISOString().split("T")[0];
    });
    setBillTo("");
    setTaxRate(0);
    setDiscount(0);
    setItems([]);
    setItemForm({
      name: "",
      quantity: "",
      price: "",
    });
  }
}


  return (
    <>
      <div className="Title">
        <h1>Mini-voice</h1>
        <p className="credit">Created by ij2005</p>
      </div>

      <div className="invoice-container">

        <div className="invoice-main">

          <div className="invoice-details">
            <div className="details-row">
              <div className="detail-group">
                <label>Company Name:</label>
                <input 
                    type="text" 
                    placeholder="Enter company name" 
                    className="detail-input" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
              </div>
            </div>

            <div className="detail-group bill-to">
              <label>Bill To:</label>
              <input 
                type="text" 
                placeholder="Enter customer name" 
                className="detail-input" 
                value={billTo} 
                onChange={(e) => setBillTo(e.target.value)} 
              />
            </div>

            <div className="detail-group">
              <label>Currency:</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)} 
                className="detail-input currency"
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="¥">JPY (¥)</option>
                <option value="₹">INR (₹)</option>
                <option value="₩">KRW (₩)</option>
                <option value="₽">RUB (₽)</option>
                <option value="₺">TRY (₺)</option>
                <option value="A$">AUD (A$)</option>
                <option value="C$">CAD (C$)</option>
                <option value="CHF">CHF (CHF)</option>
                <option value="HK$">HKD (HK$)</option>
                <option value="NZ$">NZD (NZ$)</option>
                <option value="SGD">SGD (SGD)</option>
                <option value="SEK">SEK (SEK)</option>
                <option value="NOK">NOK (NOK)</option>
                <option value="DKK">DKK (DKK)</option>
                <option value="ZAR">ZAR (ZAR)</option>
                <option value="BRL">BRL (R$)</option>
                <option value="MXN">MXN ($)</option>
                <option value="MYR">MYR (RM)</option>
                <option value="PHP">PHP (₱)</option>
              </select>
            </div>


            <div className="details-row">
              <div className="detail-group">
                <div className="details-row">
                    <div className="detail-group">
                      <label>Invoice #:</label>
                      <input
                        type="text"
                        className="detail-input"
                        placeholder={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                      />
                    </div>
                  </div>

              </div>

              <div className="detail-group">
                <label>Date:</label>
                  <input
                    type="date"
                    className="detail-input calendar"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
              </div>


            </div>
          </div>

            <div className="items-input-row">
              <input type="text" placeholder="Item name" className="item-input" value={ItemForm.name} onChange={e => {setItemForm({ ...ItemForm, name: e.target.value});}}/>
              <input type="number" placeholder="Qty" className="item-input qty-input" value={ItemForm.quantity} onChange={e => {setItemForm({ ...ItemForm, quantity: e.target.value});}}/>
              <input type="number" placeholder="Price" className="item-input" value={ItemForm.price} onChange={e => {setItemForm({ ...ItemForm, price: e.target.value});}}/>
              <button className="add-button"onClick={(AddItems)}>Add</button>
            </div>

            <div className="invoice-items">
              <div className="items-header">
                <div className="item-column-title">Item</div>
                <div className="item-column-title">Quantity</div>
                <div className="item-column-title">Price</div>
                <div className="item-column-title">Total</div>
                <div className="item-column-title">Action</div>
            </div>

            <div className="items-canvas">
              {items.map((item, index) => (
                <div key={index} className="item-row">
                    <div className="item-column">{item.name}</div>
                    <div className="item-column">{item.quantity}</div>
                    <div className="item-column">{currency}{item.price}</div>
                    <div className="item-column">{currency}{(item.quantity * item.price).toFixed(2)}</div>
                    <div className="item-column">
                      <button onClick={() => removeItem(index)}>Remove</button>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          <div className="invoice-totals">
            <div className="total-row">
              <label>Subtotal:</label>
              <span>{currency}{subtotal}</span>
            </div>

            <div className="total-row">
              <label>Tax (%):</label>
              <input 
                type="number" 
                value={taxRate} 
                onChange={(e) => {
                    const value = e.target.value === "" ? undefined : Number(e.target.value);
                    setTaxRate(value);
                  }}
                placeholder="0"
                className="total-bg"
              />
            </div>

            <div className="total-row">
              <label>Discount:</label>
              <input 
                type="number" 
                value={discount} 
                onChange={(e) => {
                    const value = e.target.value === "" ? undefined : Number(e.target.value);
                    setDiscount(value);
                  }}
                placeholder="0"
                className="total-bg"
              />
            </div>

            <div className="final-total-row">
              <label>Final Total:</label>
              <span>
                {items.length > 0 ? `${currency}${Final}` : "Incomplete Input."}
              </span>
              <button className="print-button" onClick={handlePrint}>Print Invoice</button>
            </div>
          </div>

          <div className="invoice-actions">
            <button className="reset-button" onClick={handleReset}>Reset Invoice</button>
          </div>
          

          <div className="invoice-printOption">
          </div>

        </div>
        
      </div>
    </>
  );
}

export default App;
