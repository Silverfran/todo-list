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
			<div className="container-fluid justify-content-center bg-light">
				<div className="row justify-content-center">
					<div className="col-4">
						<div className="row justify-content-center">
							<div className="col-auto">
								<h3>todos</h3>
							</div>
						</div>
						<div className="row justify-content-center border">
							<div className="col-auto">
								<form onSubmit={this.handleSubmit}>
									<label htmlFor="new-todo" />
									<input
										id="new-todo"
										onChange={this.handleChange}
										value={this.state.text}
									/>
									<button> + </button>
								</form>
							</div>
						</div>
						<TodoList
							items={this.state.items}
							callbackDelete={this.handleDelete}
						/>
						<p>{this.state.items.length} items left</p>
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
			<div
				key={item.id}
				className="row justify-content-between parent border">
				<div className="col-auto"> {item.text} </div>
				<div className="col-2 child">
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
