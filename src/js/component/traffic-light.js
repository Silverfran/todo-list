import React, { useState } from "react";

export function Example() {
	const [state, setState] = useState({ green: "", yellow: "", red: "" });

	return (
		<div className="col-md-1 p-4 m-4 bg-dark justify-content-center d-flex flex-wrap mx-auto inline-block">
			<div
				className={`${state.green} row p-5 bg-success rounded-circle`}
				onClick={() =>
					setState(
						state.green === ""
							? { green: "blurGreen", yellow: "", red: "" }
							: { green: "", yellow: "", red: "" }
					)
				}
			/>
			<br />
			<div
				className={`${state.yellow} row p-5 bg-warning rounded-circle`}
				onClick={() =>
					setState(
						state.yellow === ""
							? { green: "", yellow: "blurYellow", red: "" }
							: { green: "", yellow: "", red: "" }
					)
				}
			/>
			<br />
			<div
				className={`${state.red} row p-5 bg-danger rounded-circle`}
				onClick={() =>
					setState(
						state.red === ""
							? { green: "", yellow: "", red: "blurRed" }
							: { green: "", yellow: "", red: "" }
					)
				}
			/>
			<br />
		</div>
	);
}
