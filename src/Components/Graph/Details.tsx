import React, { FunctionComponent } from "react";
import { DieSymbol } from "../../Models/DieSymbol";

export interface IGraphDetailsProps {
	mode: DieSymbol;
	counterMode: DieSymbol;
}

export const GraphDetails: FunctionComponent<IGraphDetailsProps> = (props: IGraphDetailsProps) => {
	const GetCalculation = () => {
		let plus = <i className={`ffi ffi-swrpg-${DieSymbol[props.mode].toLowerCase()}`} />;
		let minus = <i className={`ffi ffi-swrpg-${DieSymbol[props.counterMode].toLowerCase()}`} />;

		if (props.mode === DieSymbol.Success) {
			plus = (
				<>
					({plus} + <i className="ffi ffi-swrpg-triumph" />)
				</>
			);
			minus = (
				<>
					({minus} + <i className="ffi ffi-swrpg-despair" />)
				</>
			);
		}

		return (
			<>
				{plus} - {minus}
			</>
		);
	};

	const GetExtras = (symbol: DieSymbol) => {
		if (props.mode === DieSymbol.Success)
			return (
				<>
					and <i className={`ffi ffi-swrpg-${DieSymbol[symbol].toLowerCase()}`} />
				</>
			);
		else return <></>;
	};

	return (
		<dl>
			<dt>{DieSymbol[props.mode]} Symbols</dt>
			<dd>
				<i className={`ffi ffi-swrpg-${DieSymbol[props.mode].toLowerCase()}`} /> {GetExtras(DieSymbol.Triumph)}
			</dd>
			<dt>Failure Symbols</dt>
			<dd>
				<i className={`ffi ffi-swrpg-${DieSymbol[props.counterMode].toLowerCase()}`} /> {GetExtras(DieSymbol.Despair)}
			</dd>
			<dt>Calculation</dt>
			<dd>{GetCalculation()}</dd>
		</dl>
	);
};
