class QuillBox extends React.Component {

    constructor() {
        super();

        this.state = {
            journals: [],
            editMode: false,
            auth: true
        }
    }

    componentWillMount() {
        $.ajax({
            type: "GET",
            url: `/api/journal/${sessionStorage.getItem("userId")}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((journals, status, xhr) => {
            this.setState({ journals });
            console.log(journals);
        }).fail((xhr) => {
            console.log(xhr.status);

            if(xhr.status == 401) {
                this.setState({
                    auth: false
                });
            }
        });

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

        if(this.state.editMode) {
            return (
                <Redirect to="/journal/new" />
            );
        }

        console.log("render called");

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
                <div className="container w-75 mx-auto">
                    <form>
                        <div className="form-row mt-5">
                            <label className="col-md-2 col-sm-2" htmlFor="filter_category">Filter By:</label>
                            <select className="form-control col-md-2 col-sm-2" id="filter_category"
                              ref={(select) => this._category = select} name="filter_category">
                                <option value="Thoughts">Thoughts</option>
                                <option value="Travel">Travel</option>
                                <option value="School">School</option>
                                <option value="Love">Love</option>
                                <option value="Friends">Friends</option>
                                <option value="Notes">Notes</option>
                                <option value="Others">Others</option>
                            </select>
                            <button type="submit" onClick={this._handleSubmitFilter.bind(this)}
                                className="btn btn-primary">Filter</button>
                        </div>
                    </form>
                  </div>
                <div className="row">
                    <div className="col-sm">
                    <button type="button" onClick={this._handleClick.bind(this)} className="btn btn-primary float-right">
                        +New
                    </button>

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <div className="card-deck">
                          <JournalList journals={this.state.journals} />
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
    }

    _handleClick(e) {
        e.preventDefault();

        this.setState({
            editMode: true
        });
    }

    _handleSubmitFilter(e) {
      e.preventDefault();
      console.log("FILTER " + this._category.value);
        $.ajax({
            type: "GET",
            url: `/api/filterJournal/${sessionStorage.getItem("userId")}/${this._category.value}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((journals, status, xhr) => {
             this.setState({ journals });
            console.log(journals);
            this.forceUpdate();
        }).fail((xhr) => {
            console.log(xhr.status);
        });
    }
}

class JournalList extends React.Component {

    render() {
        let journals = this._getJournals();

        return(
            journals.map((journal) =>
                    <JournalCard
                        key={journal._id}
                        journalId={journal._id}
                        title={journal.title}
                        entry={journal.entry}
                        category={journal.category} />
                )
        );
    }

    _getJournals() {
        return this.props.journals;
    }
}

class JournalCard extends React.Component {

    constructor() {
        super();

        this.state = {
            refresh: false,
            edit: ""
        }
    }

    render() {

        if(this.state.edit != "") {
            return (
                <Redirect to={`/journals/${this.state.edit}`} />
            );
        }

        if(this.state.refresh) {
            return (
                <Redirect to="/" />
            );
        }

        return(
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{this.props.title}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Entry</h6>
                            <p className="card-text">{this.props.entry}</p>
                            <h6 className="card-subtitle mb-2 text-muted">Category</h6>
                            <p className="card-text">{this.props.category}</p>
                            <ManageButton journalId={this.props.journalId} action={this._handleEdit.bind(this)} text="Edit" />
                            <ManageButton journalId={this.props.journalId} action={this._handleDelete.bind(this)} text="Delete" />
                        </div>
                    </div>
        );
    }

    _handleEdit(journalId) {
        console.log(journalId);

        this.setState({
            edit: journalId
        });
    }

    _handleDelete(journalId) {
        console.log(journalId);

        $.ajax({
            type: "DELETE",
            url: `/api/journal/${journalId}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((res, status, xhr) => {
            this.setState({
                refresh: true
            });
        }).fail((xhr) => {
            console.log(xhr.status);
        });
    }

}

class ManageButton extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <a href="#" onClick={this._handleEdit.bind(this)} className="card-link">{this.props.text}</a>
        );
    }

    _handleEdit(e) {
        e.preventDefault();
        this.props.action(this.props.journalId);
    }

}
