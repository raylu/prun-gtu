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

	static styles = css`
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
