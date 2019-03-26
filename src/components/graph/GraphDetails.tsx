import { DieSymbol } from "../../Models/PoolCombinationContainer";
import * as React from "react";

// At runtime, Redux will merge together...
type GraphDetailsProps = IGraphDetailsProps; // ... state we've requested from the Redux store // ... plus incoming routing parameters

export interface IGraphDetailsProps {
	mode: DieSymbol;
}

export default class GraphDetails extends React.Component<GraphDetailsProps, {}> {
	public render() {
		switch (this.props.mode) {
			case DieSymbol.Success:
				return (
					<dl>
						<dt>Success Symbols</dt>
						<dd>
							<i className="ffi ffi-swrpg-success" /> and <i className="ffi ffi-swrpg-triumph" />
						</dd>
						<dt>Failure Symbols</dt>
						<dd>
							<i className="ffi ffi-swrpg-failure" /> and <i className="ffi ffi-swrpg-despair" />
						</dd>
						<dt>Calculation</dt>
						<dd>
							(<i className="ffi ffi-swrpg-success" /> + <i className="ffi ffi-swrpg-triumph" />) - (<i className="ffi ffi-swrpg-failure" /> + <i className="ffi ffi-swrpg-despair" />)
						</dd>
					</dl>
				);
			case DieSymbol.Advantage:
				return (
					<dl>
						<dt>Advantage Symbol</dt>
						<dd>
							<i className="ffi ffi-swrpg-advantage" />
						</dd>
						<dt>Threat Symbol</dt>
						<dd>
							<i className="ffi ffi-swrpg-threat" />
						</dd>
						<dt>Calculation</dt>
						<dd>
							<i className="ffi ffi-swrpg-advantage" /> - <i className="ffi ffi-swrpg-threat" />
						</dd>
					</dl>
				);
			case DieSymbol.Triumph:
				return (
					<dl>
						<dt>Triumph Symbol</dt>
						<dd>
							<i className="ffi ffi-swrpg-triumph" />
						</dd>
						<dt>Despair Symbol</dt>
						<dd>
							<i className="ffi ffi-swrpg-despair" />
						</dd>
						<dt>Calculation</dt>
						<dd>
							<i className="ffi ffi-swrpg-triumph" /> - <i className="ffi ffi-swrpg-despair" />
						</dd>
					</dl>
				);
			default:
				return <></>;
		}
	}
}
