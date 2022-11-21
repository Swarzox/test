import Feed from "./Feed.js";
import Upload from "./Upload.js";
import Profil from "./Profil.js";
import Navbar from "./Navbar.js";

function App() {
	
	const e = React.createElement
	const loginRef = React.useRef(null);
	const [upload, setUpload] = React.useState(false);
	const [feed, setFeed] = React.useState(false);
	const [user, setUser] = React.useState({});
	
	const [currentProfil, setCurrentProfil] = React.useState("");
	
	let hasSession = Object.keys(user).length != 0
		
	function retrieveSession() {
		fetch("http://localhost:8080/connection")
			.then((res) => {
				return res.text();
			}).then((data) => {
				const rep = JSON.parse(data)
				if(rep.session) {
					setUser({id: rep.id})
				}
			});
	}
	
	function handleConnection(token) {
		fetch("http://localhost:8080/connection?token="+token)
			.then((res) => {
				return res.text();
			}).then((data) => {
				const rep = JSON.parse(data)
				if(rep.session) {
					setUser({id: rep.id})
				}
			});
	}
	
	function handleCallbackResponse(response) {
		const repPayload = jwt_decode(response.credential);
		handleConnection(response.credential)
	}
	
	function handleSignOut(e) {
		setUser({});
		fetch("http://localhost:8080/disconnection")
			.then((res) => {
				console.log(res);
			})
	}
	
	React.useEffect(() => {
		retrieveSession();
		if(Object.keys(user).length == 0) {
			google.accounts.id.initialize({
				client_id: "851071215458-a6qv6vpm4ljs5jli8j7n4fnk5aqfs60h.apps.googleusercontent.com",
				callback: handleCallbackResponse
			});
			google.accounts.id.renderButton(loginRef.current, {theme: "outline", size:"large"});
		}
	}, [loginRef.current]);
  
	return (
		e("div", { className: "container" },
			hasSession && e(Navbar, {setCurrentProfil, userId: user.id, setUpload, setFeed, setUser}, null),
			hasSession && feed && e(Feed,null,null),
			hasSession && (currentProfil != "") && e(Profil, {currentProfil, userId: user.id}, null),
			hasSession && upload && e(Upload, null, null),
			!hasSession && e("div", {ref: loginRef}, null),
		)
	);
}
export default App;