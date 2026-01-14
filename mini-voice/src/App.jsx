import "./App.css";
import { useState } from "react";

function App() {
  
  const items = [
  { name: "Notebook", quantity: 2, price: 150 },
  { name: "Pen", quantity: 5, price: 20 },
  { name: "Stapler", quantity: 1, price: 250 },
]; //test array.
  
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);

  return (
    <>
      <div className="Title">
        <h1>Mini-voice</h1>
      </div>

      <div className="invoice-container">

        <div className="invoice-main">

          <div className="invoice-details">
            <div className="details-row">
              <div className="detail-group">
                <label>Company Name:</label>
                <input type="text" placeholder="Enter company name" className="detail-input" />
              </div>
            </div>

            <div className="details-row">
              <div className="detail-group">
                <label>Invoice #:</label>
                <span className="detail-text">INV-XXXX</span>
              </div>

              <div className="detail-group">
                <label>Date:</label>
                <span className="detail-text">YYYY-MM-DD</span>
              </div>
            </div>
          </div>

            <div className="items-input-row">
              <input type="text" placeholder="Item name" className="item-input" />
              <input type="number" placeholder="Qty" className="item-input qty-input" />
              <input type="number" placeholder="Price" className="item-input" />
              <button className="add-button">Add</button>
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
                    <div className="item-column">{item.price}</div>
                    <div className="item-column">{item.quantity * item.price}</div>
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
              <span></span>
            </div>

            <div className="total-row">
              <label>Tax (%):</label>
              <input 
                type="number" 
                value={taxRate} 
                onChange={(e) => setTaxRate(e.target.value)}
                placeholder="0"
                className="total-bg"
              />
            </div>

            <div className="total-row">
              <label>Discount:</label>
              <input 
                type="number" 
                value={discount} 
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="0"
                className="total-bg"
              />
            </div>

            <div className="final-total-row">
              <label>Final Total:</label>
              <span></span>
              <button className="print-button">Print Invoice</button>
            </div>
          </div>

          <div className="invoice-printOption">
          </div>

        </div>
        
      </div>
    </>
  );
}

export default App;
