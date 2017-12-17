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
              
              <div id="content">
                  <Route exact path="/journal/new" component={JournalNew} />
                  <Route exact path="/session/new" component={LoginBox} />
                  <Route exact path="/journals/:journalId" component={JournalEditBox} />
                  <Route exact path="/" component={QuillBox} />
              </div>
              <footer className="footer">
                <div className="container">
                  <span className="text-muted">Copyright Quill 2017. All Rights Reserved.</span>
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
