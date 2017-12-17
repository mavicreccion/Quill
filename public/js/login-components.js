class LoginBox extends React.Component {

    constructor() {
        super();

        this.state ={
            message: "",
            redirect: false
        }
    }

    render() {

        if(this.state.redirect) {
            return (
                <Redirect to="/" />
            );
        }

        return (
          <div>
            <header>
              <nav className="navbar navbar-expand-md navbar-dark fixed-top">
                <a className="navbar-brand" href="#">Quill</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                  aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                      <a className="nav-link" href="#">Login <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Register</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </header>
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-12">
                  <div className="card border-none">
                    <div className="card-body">
                      <div className="mt-2 text-center">
                        <h2>Login Your Account</h2>
                      </div>
                      <p className="mt-4 text-black lead text-center">
                        Ready to continue your journey?
                      </p>
                      <div className="mx-4" id="col-sm-login">
                        <div className="alert-login alert alert-danger invisible" role="alert">
                            {this.state.message}
                        </div>
                        <form onSubmit={this._handleSubmit.bind(this)}>
                          <div className="form-group">
                            <input type="email" className="form-control" ref={(input) => this._name = input} name="name"  placeholder="Enter email address"/>
                          </div>
                          <div className="form-group">
                            <input type="password" className="form-control" name="password" ref={(input) => this._password = input} placeholder="Enter password"/>
                          </div>
                          <hr></hr>
                          <button type="submit" className="btn btn-primary btn-block mt-3">Login Account</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }

    _handleSubmit(e) {
        e.preventDefault();

        let session = {
            name: this._name.value,
            password: this._password.value
        }
        $.ajax({
            type: "GET",
            url: `/api/getUser/${this._name.value}`
        }).done((user, status, xhr) => {
            console.log(user[0]._id);
            sessionStorage.setItem("userId", user[0]._id);
            sessionStorage.setItem("name", user[0].name);
        }).fail((xhr) => {
            console.log(xhr.status);
        });
        $.ajax({
            type: "POST",
            url: "/api/session",
            data: session
        }).done((res, status, xhr) => {
            sessionStorage.setItem("token", xhr.getResponseHeader("Authorization"));
            this.setState({ redirect: true });
        }).fail((xhr) => {
            if(xhr.status == 401) {
                this._showLoginError("Invalid name or password.");
            }
        });
    }

    _showLoginError(error) {
        this.setState({
            message: error
        });

        let loginAlert = $(".alert-login");

        if(loginAlert.hasClass("invisible")) {
            loginAlert.removeClass("invisible");
        }
    }
}
