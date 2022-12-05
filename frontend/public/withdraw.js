const { json, text } = require("express");

function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  
  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const[email, setEmail] = React.useState('');
  const [amount, setAmount] = React.useState('');  
  const [balance, setBalance] = React.useState('');
  
          

  function handle(){
  fetch(`/account/update/${email}/-${amount}`)
  .then(res => res.text())
  .then(text =>{
    try{
      const data = JSON.parse(text)
      props.setShow(false);
      props.setAmount()
      console.log('JSON :',text)
    }catch(err){
      props.setStatus(text)
      console.log('err:', text)
    }
  })
    
  }
  return(<>
  Email<br/>
  <input type="email"
  className="form-control"
  placeholder="Enter Your Email"
  value={email}
  onChange={e => setEmail(e.currentTarget.value)}
  />

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
