function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Your Account has been created Successfully</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account Jeevanantham</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');  

  function handle(){
    fetch(`/account/create/${name}/${email}/${password}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(data)
    }).then(res =>
      res.json(),
      alert("Submitted Sucessfully"),
      // props.setStatus(''),
      props.setShow(false)
    ).then(data =>
      console.log(data)
    ).catch(err => {
      alert("error")
      console.log(err)
    }
    )
        
  }   
  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="email" 
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

    <button type="submit" 
      className="btn btn-light" 
      disabled={!name || !email || !password}
      onClick={handle}>Create Account</button>
  </>);
}