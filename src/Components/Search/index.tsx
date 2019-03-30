import React, { FunctionComponent } from "react";
import { DieIncrementer } from "./Incrementer";
import { IStatisticsState } from "../../Hooks/SearchStatistics/StatisticState";
import { DieType } from "../../Models/DieType";

type SearchProps = IStatisticsState & ISearchProps;

export interface ISearchProps {
	addDieCallback: Function;
	removeDieCallback: Function;
	searchCallback: Function;
}

export const Search: FunctionComponent<SearchProps> = (props: SearchProps) => {

	const FormatDice = (set: IStatisticsState): string => {
		return "{" + set.searchDice.map(map => "{" + map.dieId + "," + map.quantity + "}").join(",") + "}";
	}

	/**
	 * Renders the current search icons as well as a search builder
	 */
	return (
		<div className="row row-fill">
			<div className="col s12">
				<div className="card">
					<div className="card-content">
						<div className="row">
							<div className="col l4 m6 s12">
								<DieIncrementer {...props} dieType={DieType.Proficiency} />
								<DieIncrementer {...props} dieType={DieType.Challenge} />
							</div>
							<div className="col l4 m6 s12">
								<DieIncrementer {...props} dieType={DieType.Ability} />
								<DieIncrementer {...props} dieType={DieType.Difficulty} />
							</div>
							<div className="col l4 m6 s12">
								<DieIncrementer {...props} dieType={DieType.Boost} />
								<DieIncrementer {...props} dieType={DieType.Setback} />
							</div>
						</div>
						<div className="row">props: {FormatDice(props)}</div>

						<span>
							<button
								className="btn btn-primary"
								onClick={() => { props.searchCallback() }}>
								Search
							</button>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
