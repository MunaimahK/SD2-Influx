import "./Login.css";
function redirect() {
  console.log("Hello");
}
const Login = () => {
  return (
    <body class="login">
      <div className="front-page">
        Influx
        <div>
          <a href="https://discord.com/api/oauth2/authorize?client_id=1179068530273034290&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fdashboard&scope=identify+email">
            <button onClick="redirect()" className="btn-start">
              Start Now
            </button>
          </a>
        </div>
      </div>
    </body>
  );
};

export default Login;
