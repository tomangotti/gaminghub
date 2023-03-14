import {useState, useEffect} from 'react'

const ws = new WebSocket("ws://localhost:3000/cable")

function ChatFeed({currentUser}){
    const [messages, setMessages] = useState([]);
    const [guid, setGuid] = useState("");
    const messagesContainer = document.getElementById("messages");
    useEffect(() => {
        fetchMessages();
    },[])

    // const ws = new WebSocket("ws://localhost:3000/cable")

    ws.onopen = () => {
        console.log("Connected to ws server");
        setGuid(Math.random().toString(36).substring(2,15));
    
        ws.send(
            JSON.stringify({
                command: "subscribe",
                identifier: JSON.stringify({
                id: guid,
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
    // }, [])

    // function handleSubmit(e){
    //     e.preventDefault()
    //     const body = { 
    //         user_id: currentUser.id,
    //         body: e.target.message.value,
    //         chatroom_id: "1"
    //     }

    //     fetch('/messages', {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify(body)
    //     })
        
        
    //     e.target.reset()
        
    // }

    
    
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
    
    const fetchMessages = async () => {
        const response = await fetch("/messages")
        const data = await response.json();
        setMessagesAndScrollDown(data)
    };
    
    const setMessagesAndScrollDown = (data) => {
        setMessages(data);
        if (!messagesContainer) return;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };
    

    return(<div className='messageApp'>
            <div className='messageHeader'>
                <h1>Messages</h1>
                <p>Guid: {guid}</p>
            </div>
            <div className='messages'>
                {messages.map((message) => (
                    <div key={message.id}>
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
            {/* <div>
                {messages.map((message) => {
                    return <p key={message.id}>{message.body}</p>
                })}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="string" name="message"/>
                    <button>SEND</button>
                </form>
            </div> */}
    </div>)

}

export default ChatFeed