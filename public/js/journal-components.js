class JournalEditBox extends React.Component {

    constructor() {
        super();

        this.state = {
            journal: {},
            auth: true,
            done: false
        }
    }

    componentWillMount() {
        let journalId = this.props.match.params.journalId;

        this._fetchJournal(journalId);

        if(!sessionStorage.getItem("token")) {
            this.setState({
                auth: false
            });
        }
    }

    render() {

        if(!this.state.auth) {
            return (
                <Redirect to="/session/new" />
            );
        }

        if(this.state.done) {
            return (
                <Redirect to="/" />
            );
        }

        return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-meeting">
                            <form onSubmit={this._handleSubmit.bind(this)}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" value={this.state.journal.title} ref={(input) => this._title = input} className="form-control" id="title" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="entry">Entry</label>
                                        <textarea value={this.state.journal.entry} ref={(textarea) => this._entry = textarea} className="form-control" id="entry" rows="3"></textarea>
                                    </div>

                                    <div className="form-group">
                                      <label htmlFor="category">Category</label>
                                      <select className="form-control " id="category" name="category" value={this.state.journal.category}
                                        ref={(select) => this._category = select}>
                                          <option value="Thoughts">Thoughts</option>
                                          <option value="Travel">Travel</option>
                                          <option value="School">School</option>
                                          <option value="Love">Love</option>
                                          <option value="Friends">Friends</option>
                                          <option value="Notes">Notes</option>
                                          <option value="Others">Others</option>
                                      </select>
                                  </div>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" onClick={this._handleClose.bind(this)} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" />
                                </div>
                            </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
        );
    }

    _handleTitleChange(e) {
        let journal = this.state.journal;

        this.setState({
            journal: Object.assign({}, journal,
                {
                    title: e.target.value
                })
        });
    }

    _handleEntryChange(e) {
        let journal = this.state.journal;

        this.setState({
            journal: Object.assign({}, journal,
                {
                    entry: e.target.value
                })
        });
    }

    _handleCategoryChange(e) {
        let journal = this.state.journal;

        this.setState({
            journal: Object.assign({}, journal,
                {
                    category: e.target.value
                })
        });
    }

    _fetchJournal(journalId) {
        $.ajax({
            type: "GET",
            url: `/api/journal/${journalId}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((journal, status, xhr) => {
            console.log(journal);
            this.setState({
                journal
            });
        }).fail((xhr) => {
            if(xhr.status == 401)
            {
                this.setState({
                    auth: false
                });
            }
        });
    }

    _handleSubmit(e) {
        e.preventDefault();

        let journalId = this.props.match.params.journalId;

        let journal = {
            title: this._title.value,
            entry: this._entry.value,
            category: this._category.value
        }

        $.ajax({
            type: "PUT",
            url: `/api/journal/${journalId}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            },
            data: journal
        }).done((data, status, xhr) => {
            this.setState({
                done: true
            });
        }).fail((xhr) => {

            if(xhr.status == 401) {
                this.setState({
                    auth: false
                });
            }
        });

        console.log(journal);

    }

    _handleClose(e) {
        e.preventDefault();

        this._close();
    }

    _close() {
        this.setState({
            done: true
        });
    }
}

class JournalNewBox extends React.Component {

    constructor() {
        super();

        this.state = {
            done: false,
            auth: true
        }
    }

    componentWillMount() {
        if(!sessionStorage.getItem("token")) {
            this.setState({
                auth: false
            });
        }
    }

    render() {

        if(!this.state.auth) {
            return (
                <Redirect to="/session/new" />
            );
        }

        if(this.state.done) {
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
                    <a className="nav-link" href="#">Journal <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Gaius Ambion</a>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm" id="col-sm-meeting">
                        <form onSubmit={this._handleSubmit.bind(this)}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" ref={(input) => this._title = input}
                                        className="form-control" id="title" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="entry">Entry</label>
                                    <textarea ref={(textarea) => this._entry = textarea}
                                        className="form-control" id="entry" rows="3"></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <select className="form-control " id="category" name="category"
                                        ref={(select) => this._category = select}>
                                              <option value="Thoughts">Thoughts</option>
                                              <option value="Travel">Travel</option>
                                              <option value="School">School</option>
                                              <option value="Love">Love</option>
                                              <option value="Friends">Friends</option>
                                              <option value="Notes">Notes</option>
                                              <option value="Others">Others</option>
                                    </select>
                                </div>
                              </div>
                              <div className="modal-footer">
                                  <button type="button" onClick={this._handleClose.bind(this)}
                                      className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                    <div className="col-sm"></div>
                </div>
            </div>

          </div>
        );
    }

    _handleClose(e) {
        e.preventDefault(e);

        this._close();
    }

    _handleSubmit(e) {
        e.preventDefault();

        let journal = {
            title: this._title.value,
            entry: this._entry.value,
            category: this._category.value
        }

        $.ajax({
            type: "POST",
            url: "/api/journal",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            },
            data: journal
        }).done((journal, status, xhr) => {
            this._close();
        }).fail((xhr) => {
            console.log(xhr.status);
        });


    }

    _close() {

        this.setState({
            done: true
        });
    }
}
