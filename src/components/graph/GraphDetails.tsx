import { DieSymbol, PoolCombinationStatistic, PoolCombinationState } from "../../services/DiceModels";
import * as React from "react";

// At runtime, Redux will merge together...
type GraphDetailsProps =
    IGraphDetailsProps;        // ... state we've requested from the Redux store // ... plus incoming routing parameters

    export interface IGraphDetailsProps {
		mode: DieSymbol;
	 }

export default class GraphDetails extends React.Component<GraphDetailsProps, {}>  {
    public render(){
		switch (this.props.mode) {
			case DieSymbol.Success:
				return <dl>
					<dt>Success Symbols</dt>
					<dd><i className="ffi ffi-swrpg-success"></i> and <i className="ffi ffi-swrpg-triumph"></i></dd>
					<dt>Failure Symbols</dt>
					<dd><i className="ffi ffi-swrpg-failure"></i> and <i className="ffi ffi-swrpg-despair"></i></dd>
					<dt>Calculation</dt>
					<dd>(<i className="ffi ffi-swrpg-success"></i> + <i className="ffi ffi-swrpg-triumph"></i>) - (<i className="ffi ffi-swrpg-failure"></i> + <i className="ffi ffi-swrpg-despair"></i>)</dd>
				</dl>;
			case DieSymbol.Advantage:
				return <dl>
					<dt>Advantage Symbol</dt>
					<dd><i className="ffi ffi-swrpg-advantage"></i></dd>
					<dt>Threat Symbol</dt>
					<dd><i className="ffi ffi-swrpg-threat"></i></dd>
					<dt>Calculation</dt>
					<dd><i className="ffi ffi-swrpg-advantage"></i> - <i className="ffi ffi-swrpg-threat"></i></dd>
				</dl>;
			case DieSymbol.Triumph:
				return <dl>
					<dt>Triumph Symbol</dt>
					<dd><i className="ffi ffi-swrpg-triumph"></i></dd>
					<dt>Despair Symbol</dt>
					<dd><i className="ffi ffi-swrpg-despair"></i></dd>
					<dt>Calculation</dt>
					<dd><i className="ffi ffi-swrpg-triumph"></i> - <i className="ffi ffi-swrpg-despair"></i></dd>
				</dl>;
			default:
				return <></>;
		}
	}
}
