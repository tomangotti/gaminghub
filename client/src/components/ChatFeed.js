import {useState} from 'react'




function ChatFeed({currentUser, ws}){
    const [messages, setMessages] = useState([]);
    // const messagesContainer = document.getElementById("messages");
    
    
    
    ws.onopen = () => {
        console.log("Connected to ws server");
        
        ws.send(
            JSON.stringify({
                command: "subscribe",
                identifier: JSON.stringify({
                    id: currentUser.id,
                    channel: "MessagesChannel",
                }),
            })
        )
    }
    
    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if(data.type === "ping") return;
        if(data.type === "welcome") return;
        if(data.type === "confirm_subscription") return;
    
        const message = data.message;
        
        console.log(message)
        setMessages([...messages, message])
    }

    // useEffect(() => {
    //     fetch('/messages')
    //     .then((r) => {
    //         if(r.ok){
    //             r.json().then((data) => {
    //                 setMessages(data)
    //             })
    //         }
    //     })
    // },[])


    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {
            body: e.target.message.value,
            user_id: currentUser.id,
            chatroom_id: "1"
        };
        e.target.message.value = "";

        await fetch("/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( body )
        })
        // .then(r => {
        //     if(r.ok){
        //         r.json().then((mess) => {
        //             console.log(mess)
        //         })
        //     }
        // })
        

        
    }
    
    // const fetchMessages = async () => {
    //     const response = await fetch("/messages")
    //     const data = await response.json();
    //     setMessagesAndScrollDown(data)
    // };
    
    // const setMessagesAndScrollDown = (data) => {
    //     setMessages(data);
    //     if (!messagesContainer) return;
    //     messagesContainer.scrolldown = messagesContainer.scrollHeight;
    // };
    

    return(<div className='messageApp'>
            <div className='messageHeader'>
                <h1>ChatFeed</h1>
                
            </div>
            <div className='messages'>
                {messages.map((message) => {
                    if(message.user.id === currentUser.id){
                    return(<div className="user-message" key={message.id} >
                        <p>{message.body}</p>
                    </div>)
                    }else{
                        return(<div className="incoming-message" key={message.id}>
                        <h5>{message.user.username}:</h5> 
                        <p>{message.body}</p>
                    </div>)
                    }
                    })}
            </div>
            <div className='messagesForm'>
                <form onSubmit={handleSubmit}>
                <input className='messageInput' type="text" name="message" />
                <button className='messageButton' type='submit'>send</button>
                </form>
            </div>
            
    </div>)

}




export default ChatFeed



