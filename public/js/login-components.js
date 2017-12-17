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

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm" id="col-sm-login">
                <div className="alert-login alert alert-danger invisible" role="alert">
                    {this.state.message}
                </div>
                        <form onSubmit={this._handleSubmit.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="name">User ID</label>
                                <input type="text" ref={(input) => this._name = input} className="form-control" id="name" placeholder="Enter user ID" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" ref={(input) => this._password = input} className="form-control" id="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                    </div>
                    <div className="col-sm"></div>
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
