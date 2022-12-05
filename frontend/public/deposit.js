function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  
  return (<>
    <h5>Success</h5>
   
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  
  function handle(){
    fetch(`/account/update/${email}/${amount}`,{
      method:"GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setShow(false)
          props.setAmount()
        } catch (err) {
          props.setStatus(text)
          console.log('err:', text);
        }
      }
      )
    
  }

  return(<>    

  Email<br/>
  <input type="email"
  className="form-control"
  placeholder="Enter Your Email"
  value={email} onChange={(e) => setEmail(e.currentTarget.value)}
  />
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}