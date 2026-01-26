import "./App.css";
import { useState } from "react";

function App() {

  const dateNow = new Date();
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
  const [invoiceDate, setInvoiceDate] = useState(() => {
  return dateNow.toISOString().split("T")[0]; // YYYY-MM-DD format
  });

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

    if(ItemForm.name == "" || ItemForm.quantity <= 0 || ItemForm.price <= 0)return alert("Please put proper values.");

    const checkDupe = items.some(item => item.name.toLowerCase() === name.toLowerCase());
    if(checkDupe){

        setItemForm({

        name: "",
        quantity: "",
        price: "",

      });

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
  

  const tax = taxRate / 100;
  const subtotal = items.reduce((total, item) => total + item.quantity * item.price, 0.00);
  const totalWithDiscount = subtotal - discount;
  const taxAmt = totalWithDiscount * tax;
  const compTotal = totalWithDiscount + taxAmt;
  
  const Final = compTotal.toFixed(2);

  function handlePrint() {
  window.print();
  }


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
              <span>{subtotal}</span>
            </div>

            <div className="total-row">
              <label>Tax (%):</label>
              <input 
                type="number" 
                value={taxRate} 
                onChange={(e) => setTaxRate(Number(e.target.value))}
                placeholder="0"
                className="total-bg"
              />
            </div>

            <div className="total-row">
              <label>Discount:</label>
              <input 
                type="number" 
                value={discount} 
                onChange={(e) => setDiscount(Number(e.target.value))}
                placeholder="0"
                className="total-bg"
              />
            </div>

            <div className="final-total-row">
              <label>Final Total:</label>
              <span>{taxRate && discount || taxRate < 0 && discount < 0 || Final < 0 ? `${Final}` : "Incomplete output."}</span>
              <button className="print-button" onClick={handlePrint}>Print Invoice</button>
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
