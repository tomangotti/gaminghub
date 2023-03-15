import {useState, useEffect, useRef} from 'react'




function ChatFeed({currentUser, ws}){
    const [messages, setMessages] = useState([]);
    const messagesContainer = document.getElementById("messages");
    
    // const ws = new WebSocket("ws://localhost:3000/cable")
    
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
        console.log(messages)
        console.log(message)
        setMessages([...messages, message])
    }

    // useEffect(() => {
    //     fetchMessages();
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

        
    }
    
    // const fetchMessages = async () => {
    //     const response = await fetch("/messages")
    //     const data = await response.json();
    //     setMessagesAndScrollDown(data)
    // };
    
    const setMessagesAndScrollDown = (data) => {
        setMessages(data);
        if (!messagesContainer) return;
        messagesContainer.scrolldown = messagesContainer.scrollHeight;
    };
    

    return(<div className='messageApp'>
            <div className='messageHeader'>
                <h1>ChatFeed</h1>
                
            </div>
            <div className='messages'>
                {messages.map((message) => (
                    <div className="message" key={message.id}>
                        <p>{message.body}</p>
                    </div>
                ))}
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



