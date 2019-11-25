const datapoints = require("./data");

class PieChart {
	constructor() {
		this.data = {};
	}

	inject(pie) {
		this.injectRecursive(pie, []);
	}

	injectRecursive(obj, path) {
		if (typeof obj === "object") {
			Object.keys(obj).forEach(key => {
				this.injectRecursive(obj[key], [...path, key]);
			});
		} 
		else {
			let curDepth = this.data;
			for (let i = 0; i < path.length; i++) {
				if (!curDepth[path[i]]) {
					curDepth[path[i]] = {};
				}
				curDepth = curDepth[path[i]];
			}

			if (!curDepth.values) {
				curDepth.values = [];
			}
			curDepth.values.push(obj);
		}
	}

	finalize() {
		this.finalizeRecursive(this.data);
	}

	finalizeRecursive(obj) {
		if(!obj.values || !Array.isArray(obj.values)) {
			Object.keys(obj).forEach(key => {
				this.finalizeRecursive(obj[key]);
			});
		} 
		else {
			let total = 0;
			obj.values.forEach(num => total += num);
			obj.average = total / obj.values.length;
		}
	}
}

const pieChart = new PieChart();

pieChart.inject(datapoints[0]);
pieChart.inject(datapoints[1]);
pieChart.inject(datapoints[2]);

pieChart.finalize();

console.log(pieChart.data);