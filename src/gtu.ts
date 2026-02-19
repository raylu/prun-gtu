import {css, html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

const prices = {
	STS: 145_000,
	FFC: 330_000,
	MFE: 90_000,
	SFE: 55_000,
	LFE: 160_000,
	GEN: 200_000,
	AHP: 10_000,
	AWH: 20_000,
	BHP: 4_000,
	BWH: 7_500,
	HHP: 6_000,
	LHP: 3_200,
	RHP: 5_000,
	HCB: 3_800_000,
	LCB: 750_000,
	LFL: 390_000,
	LSL: 450_000,
	MCB: 350_000,
	MFL: 200_000,
	MSL: 190_000,
	SCB: 100_000,
	SFL: 100_000,
	SSL: 45_000,
	TCB: 25_000,
	VCB: 750_000,
	VSC: 40_000,
	WCB: 700_000,
	AEN: 2_250_000,
	ENG: 970_000,
	FSE: 1_000_000,
	HPR: 1_000_000,
	HTE: 3_400_000,
	HYR: 1_600_000,
	QCR: 1_200_000,
	RCT: 1_000_000,
	AGS: 480_000,
	APT: 45_000,
	ARP: 8_000,
	BGS: 180_000,
	BPT: 9_900,
	BRP: 5_000,
	SRP: 9_000,
	BR1: 800_000,
	BR2: 1_400_000,
	BRS: 400_000,
	CQL: 1_800_000,
	CQM: 1_000_000,
	CQS: 750_000,
	CQT: 300_000,
	RDL: 1_000_000,
	RDS: 700_000,
	SSC: 500,
} as const;

const ships: Kit[] = [
	{
		name: 'Enhanced large transport',
		components: {
			LHP: 94,
			BR1: 1,
			CQM: 1,
			FSE: 1,
			FFC: 1,
			LCB: 1,
			LFE: 2,
			MFE: 2,
			LFL: 1,
			QCR: 1,
			SFE: 1,
			SSC: 128,
			MSL: 1,
		}
	},
	{
		name: 'Expedition large transport',
		components: {
			BR1: 1,
			CQL: 1,
			FFC: 1,
			FSE: 1,
			LCB: 1,
			LFE: 2,
			LFL: 1,
			LSL: 1,
			MFE: 3,
			QCR: 1,
			RDL: 1,
			RHP: 100,
			SFE: 1,
			SSC: 142,
			STS: 1,
		}
	},
	{
		name: 'Standard large transport',
		components: {
			BHP: 90,
			BR1: 1,
			CQM: 1,
			ENG: 1,
			FFC: 1,
			LCB: 1,
			LFE: 2,
			MFE: 1,
			SFL: 1,
			RCT: 1,
			SFE: 2,
			SSC: 121,
			SSL: 1,
		}
	},
	{
		name: 'Enhanced heavy freighter',
		components: {
			LHP: 68,
			BR1: 1,
			CQS: 1,
			FSE: 1,
			FFC: 1,
			LFE: 1,
			MFE: 2,
			LFL: 1,
			QCR: 1,
			SFE: 1,
			SSC: 78,
			MSL: 1,
			WCB: 1,
		}
	},
	{
		name: 'Standard heavy freighter',
		components: {
			BHP: 64,
			BR1: 1,
			CQS: 1,
			ENG: 1,
			FFC: 1,
			LFE: 1,
			MFE: 1,
			SFL: 1,
			RCT: 1,
			SFE: 2,
			SSC: 71,
			SSL: 1,
			WCB: 1,
		}
	},
	{
		name: 'Enhanced BEAST',
		components: {
			AEN: 1,
			AHP: 159,
			BR2: 1,
			CQL: 1,
			FFC: 1,
			HCB: 1,
			HPR: 1,
			LFE: 5,
			LFL: 1,
			MFE: 2,
			MSL: 1,
			SFE: 2,
			SSC: 284,
		}
	},
	{
		name: 'Standard BEAST',
		components: {
			BHP: 157,
			BR1: 1,
			CQL: 1,
			FFC: 1,
			FSE: 1,
			HCB: 1,
			LFE: 5,
			LFL: 1,
			MFE: 2,
			MSL: 1,
			QCR: 1,
			SFE: 1,
			SSC: 278,
		}
	},
	{
		name: 'Firefly FTL courier',
		components: {
			AGS: 1,
			BR1: 1,
			CQT: 1,
			FFC: 1,
			FSE: 1,
			LFL: 1,
			MFE: 2,
			QCR: 1,
			RHP: 34,
			SFE: 1,
			SSC: 27,
			SSL: 1,
			TCB: 1,
		}
	},
	{
		name: 'Voyager deep space explorer',
		components: {
			BR1: 1,
			CQT: 1,
			FFC: 1,
			FSE: 1,
			LFL: 1,
			LHP: 34,
			MFE: 2,
			QCR: 1,
			RDL: 1,
			SFE: 1,
			SSC: 27,
			SSL: 1,
			STS: 1,
			TCB: 1,
		}
	},
	{
		name: 'STL-only courier shuttle',
		components: {
			AGS: 1,
			BRS: 1,
			CQT: 1,
			FSE: 1,
			RHP: 43,
			SCB: 1,
			SSC: 40,
			SSL: 1,
		}
	},
	{
		name: 'STL-only economy shuttle',
		components: {
			BRS: 1,
			CQT: 1,
			GEN: 1,
			LHP: 43,
			SCB: 1,
			SSC: 40,
			SSL: 1,
		}
	},
];
const upgrades: Kit[] = [
	{
		name: 'WCB starter ship upgrade',
		components: {
			BHP: 16,
			LFE: 1,
			SSC: 25,
			WCB: 1,
		}
	},
	{
		name: 'Enhanced WCB starter ship upgrade',
		components: {
			BHP: 20,
			LFE: 1,
			LFL: 1,
			MSL: 1,
			SSC: 32,
			WCB: 1,
		}
	},
	{
		name: 'MCB starter ship upgrade',
		components: {
			BHP: 16,
			LFE: 1,
			MCB: 1,
			SSC: 25,
		}
	},
	{
		name: 'LCB starter ship upgrade',
		components: {
			BHP: 42,
			CQM: 1,
			LFE: 2,
			LCB: 1,
			SSC: 75,
		}
	},
]

interface Kit {
	name: string,
	components: Partial<Record<keyof typeof prices, number>>
}

const fmt = new Intl.NumberFormat(undefined, {maximumFractionDigits: 0});

@customElement('gtu-table')
export class GTUTable extends LitElement {
	@property({attribute: false})
	count: Map<keyof typeof prices, number> = new Map();

	protected updated(changedProperties: Map<string, any>) {
		if (!changedProperties.has('count'))
			return;
		if (this.count.size)
			history.pushState({}, '', '#' + [...this.count.entries().map(([k, v]) => `${k}=${v}`)].join('&'));
		else
			history.pushState({}, '', location.pathname);
	}


	protected render() {
		const total = this.count.entries().reduce((acc, [ticker, count]) => acc + (count * prices[ticker]), 0);
		return html`
		<h2>Ship kits</h2>
		<section>
			${ships.map((upgrade) => this.renderKit(upgrade))}
		</section>
		<h2>Upgrade kits</h2>
		<section>
			${upgrades.map((upgrade) => this.renderKit(upgrade))}
		</section>
		<table>
			<thead>
				<tr>
					<th>component</th>
					<th>MSRP</th>
					<th>count</th>
					<th>cost</th>
				</tr>
			</thead>
			<tbody>
				${entries(prices).map(([ticker, price]) => this.renderRow(ticker, price, this.count.get(ticker)))}
				<tr>
					<td></td>
					<td></td>
					<td>total</td>
					<td>${fmt.format(total)}</td>
				</tr>
			</tbody>
		</table>
		`;
	}

	private renderKit(upgrade: Kit) {
		const total = entries(upgrade.components).reduce(
				(acc, [ticker, count]) => acc + (count! * prices[ticker]), 0);
		return html`
			<article @click=${() => this.onKitClick(upgrade)}>
				<h3>${upgrade.name}</h3>
				<b>$${fmt.format(total)}</b>
				<table>
					<tbody>
						${entries(upgrade.components).map(([ticker, count]) => html`
							<tr>
								<td>${ticker}</td>
								<td>${count}</td>
							</tr>
						`)}
					</tbody>
				</table>
			</article>
		`
	}

	private renderRow(ticker: keyof typeof prices, price: number, count: number | undefined) {
		return html`
		<tr>
			<td>${ticker}</td>
			<td>${fmt.format(price)}</td>
			<td><input type="number" .value=${count} min="0" @input="${(e: Event) => this.onInputChange(e, ticker)}"></td>
			<td>${count && fmt.format(count * price)}</td>
		</tr>
		`;
	}

	private onInputChange(e: Event, ticker: keyof typeof prices) {
		const input = e.target as HTMLInputElement;
		if (input.value === '') {
			this.count.delete(ticker);
			this.requestUpdate('count');
		} else if (!isNaN(input.valueAsNumber)) {
			this.count.set(ticker, input.valueAsNumber);
			this.requestUpdate('count');
		}
	}

	private onKitClick(upgrade: Kit) {
		for (const [ticker] of entries(prices))
			if (ticker in upgrade.components)
				this.count.set(ticker, upgrade.components[ticker]!);
			else
				this.count.delete(ticker);
		this.requestUpdate('count');
	}

	static styles = css`
		section {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 1em;
			margin: 1em 0;

			article {
				padding: 10px 12px;
				background-color: #1118;
				cursor: pointer;
				border: 1px solid #555;
				border-radius: 3px;
				transition: border-color 0.5s, background-color 0.5s;
				&:hover {
					border-color: #747;
					background-color: #111c;
				}

				h3 { margin: 0 0 0.5em; }
			}
		}

		td {
			font-family: monospace;
			text-align: right;
			padding: 0 1em;
		}
		td:first-child {
			text-align: inherit;
			padding-left: 0;
		}
		td:last-child {
			padding-right: 0;
		}

		input {
			background-color: #111;
			color: inherit;
			border: 1px solid #555;
			padding: 0.25em;
			width: 5em;
		}
	`;
}

const gtuTable = document.querySelector<GTUTable>('gtu-table')!;
if (document.location.hash.slice(1))
	for (const param of document.location.hash.slice(1).split('&')) {
		const [key, value] = param.split('=');
		gtuTable.count.set(key as keyof typeof prices, Number(value));
	};

function entries<T extends object>(obj: T) {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
}
