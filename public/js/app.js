const Router = window.ReactRouterDOM.HashRouter;
const Route =  window.ReactRouterDOM.Route;
const Link =  window.ReactRouterDOM.Link;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;
const hashHistory = window.ReactRouterDOM.hashHistory;

class AppBox extends React.Component {

    render() {
        return (
        <Router>
            <div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top">
              <a className="navbar-brand" href="#">Quill</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Journal <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Gaius Ambion</a>
                  </li>
                </ul>
              </div>
            </nav>

            <div id="content">
                <Route exact path="/journal/new" component={JournalNewBox} />
                <Route exact path="/session/new" component={LoginBox} />
                <Route exact path="/journals/:journalId" component={JournalEditBox} />
                <Route exact path="/" component={QuillBox} />
            </div>
                    <hr />
              <footer class="footer">
                <div class="container">
                  <span class="text-muted">Copyright Quill 2017. All Rights Reserved.</span>
                </div>
              </footer>
            </div>
      </Router>

        );
    }
}
const Login = () => <LoginBox />
const Home = () => <QuillBox />
const JournalNew = () => <JournalNewBox />
const JournalEdit = () => <JournalEditBox />

ReactDOM.render(<AppBox />, document.getElementById("root"));
