import { DieSymbol, PoolCombinationStatistic, PoolCombinationState } from "../../services/DiceModels";
import * as React from "react";

// At runtime, Redux will merge together...
type GraphBreakdownProps =
    PoolCombinationState;        // ... state we've requested from the Redux store // ... plus incoming routing parameters
    
export default class Graph extends React.Component<GraphBreakdownProps, {}>  {
    public render(){
        return <></>;
    }

/**
	 * Calculates the statictical model and builds a definition list for that data
	 * @param mode
	 * @param counterMode
	 * @param baseSet
	 * @param totalFrequency
	 */
	private RenderBreakdown(mode: DieSymbol, counterMode: DieSymbol, baseSet: PoolCombinationStatistic[], totalFrequency: number) {

		var positiveSet = baseSet.filter(f => f.quantity > 0);
		//success mode requires 0 quantity outcomes as well
		var negativeSet = baseSet.filter(f => (f.quantity < (mode == DieSymbol.Success ? 1 : 0)));

		var positiveFrequency = positiveSet.reduce((total, obj) => { return total + obj.frequency }, 0);
		var negativeFrequency = negativeSet.reduce((total, obj) => { return total + obj.frequency }, 0);

		var average = baseSet.reduce((total, obj) => { return total + (obj.quantity * obj.frequency) }, 0) / totalFrequency;
		//val - avg squared * qty
		var deviationSet = baseSet.map(map => ((map.quantity - average) ** 2) * map.frequency);
		var standardDeviation = Math.sqrt(deviationSet.reduce((total, obj) => { return total + obj }, 0) / totalFrequency);

		var totalLabeling = mode == DieSymbol.Success ? "Total Frequency" : "";
		var totalData = mode == DieSymbol.Success ? new Intl.NumberFormat("en-Us").format(totalFrequency) : null;


		return <dl>
			<dt>{totalLabeling}</dt>
			<dd>{totalData}</dd>
			<dt>{DieSymbol[mode]} Frequency</dt>
			<dd>{new Intl.NumberFormat("en-Us").format( positiveFrequency)}</dd>
			<dt>Probability of {DieSymbol[mode]}</dt>
			<dd>{new Intl.NumberFormat("en-Us", { minimumFractionDigits: 4 }).format(positiveFrequency / totalFrequency * 100)}%</dd>
			<dt>{DieSymbol[counterMode]} Frequency</dt>
			<dd>{new Intl.NumberFormat("en-Us").format(negativeFrequency)}</dd>
			<dt>Probability of {DieSymbol[counterMode]}</dt>
			<dd>{new Intl.NumberFormat("en-Us", { minimumFractionDigits: 4 }).format(negativeFrequency / totalFrequency * 100)}%</dd>
			<dt>Average {DieSymbol[mode]}</dt>
			<dd>{new Intl.NumberFormat("en-Us", { minimumFractionDigits: 4 }).format(average)}</dd>
			<dt>Standard Deviation</dt>
			<dd>{new Intl.NumberFormat("en-Us", { minimumFractionDigits: 4 }).format(standardDeviation)}</dd>
		</dl>;
    }
    
    
	/**
	 *
	 * @param mode
	 */
	private RenderAdditionalDetails(mode: DieSymbol) {

		switch (mode) {
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
				return <span></span>;
		}
		//			<p><i className="ffi ffi-swrpg-triumph"></i> is countered by both <i className="ffi ffi-swrpg-failure"></i> and <i className="ffi ffi-swrpg-despair"></i>. As a result a triumph can only occur on a success and net count of <i className="ffi ffi-swrpg-triumph"></i> is adjusted by the uncountered <i className="ffi ffi-swrpg-triumph"></i></p>
    }
}