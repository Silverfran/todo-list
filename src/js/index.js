//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";

//render your react application

class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [], text: "" };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col">
						<div className="row">
							<div className="col">
								<h1>todos</h1>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<form onSubmit={this.handleSubmit}>
									<label htmlFor="new-todo" />
									<input
										className="new-todo"
										placeholder="What needs to be done?"
										id="new-todo"
										onChange={this.handleChange}
										value={this.state.text}
									/>
								</form>
							</div>
						</div>
						<TodoList
							items={this.state.items}
							callbackDelete={this.handleDelete}
						/>
						<div className="my-3">
							{this.state.items.length} items left
						</div>
					</div>
				</div>
			</div>
		);
	}

	handleChange(e) {
		this.setState({ text: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.text.length === 0) {
			return;
		}
		const newItem = {
			text: this.state.text,
			id: Date.now()
		};
		this.setState(state => ({
			items: state.items.concat(newItem),
			text: ""
		}));
	}
	handleDelete(e) {
		this.setState(
			this.state.items.splice(
				this.state.items.map(i => i.text).indexOf(e),
				1
			)
		);
	}
}

class TodoList extends React.Component {
	render() {
		return this.props.items.map(item => (
			<div key={item.id} className="row parent h-10 p-2 main">
				<div className="col-11"> {item.text} </div>
				<div className="col-1 child">
					<i
						className="fa fa-times"
						onClick={() => {
							this.props.callbackDelete(item.text);
						}}></i>
				</div>
			</div>
		));
	}
}

TodoList.propTypes = {
	items: PropTypes.array,
	callbackDelete: PropTypes.func
};

ReactDOM.render(<TodoApp />, document.querySelector("#app"));
