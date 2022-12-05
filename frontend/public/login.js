function Login(){
  
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  return (
    <div>
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ?
        <LoginForm setShow={setShow} setStatus={setStatus}/>:
        <LoginMsg setShow={setShow} setStatus={setStatus}/>
      }
    />
    </div>
  ) 
}

function LoginMsg(props){  
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  
  
  function handle(){
    fetch(`/account/login/${email}/${password}`)
    .then(res => res.text())
    .then(text =>{
      try{
        const data = JSON.parse(text);
        alert("Login Sucessfully");
        props.setStatus('');
        props.setShow(false);
       
        console.log('JSON:',data);
      }catch(err){
        props.setStatus(text)
        console.log('err:',text);
      }
    });
    
  }
  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>
    <button type="submit" className="btn btn-light" disabled={!email || !password}onClick={handle}>Login</button>  
  </>);
}