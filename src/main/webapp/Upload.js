export default function Upload() {
	
	const e = React.createElement
	const formRef = React.useRef(null);
	
	React.useEffect(() => {
		fetch("http://localhost:8080/upload")
			.then((response) => {
				return response.text();
			})
			.then((imageUploadUrl) => {
				formRef.current.action = imageUploadUrl;
			});
	}, [formRef.current]);
	
	return (
		e("div", { className: "container" },
			e("iframe", {
			  name: "noredirect",
			  id: "noredirect",
			  style: {display: "none"}
			}),
			e("form", {
			  id: "createPostForm",
			  method: "post",
			  encType: "multipart/form-data",
			  target: "noredirect",
			  ref: formRef
			}, e("input", {
			  type: "file",
			  name: "img"
			}), e("input", {
			  type: "submit",
			  value: "Submit"
			}))
		)
	)
}