import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  bigChart() {
    return [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  }

  cards() {
    return [71, 78, 39, 66];
  }

  pieChart() {
    return [{
      name: 'Fixed',
      y: 85
    }, {
      name: 'Risk Accepted',
      y: 15
    }];
  }
  pieChartOne() {
    return [{
      name: 'CDO',
      y: 50
    }, {
      name: 'Sanctions',
      y: 50
    }];
  }

  // pieChartOne() {
  //   return [{
  //     name: 'Chrome',
  //     y: 61.41,
  //     sliced: true,
  //     selected: true
  //   }, {
  //     name: 'Internet Explorer',
  //     y: 11.84
  //   }, {
  //     name: 'Firefox',
  //     y: 10.85
  //   }, {
  //     name: 'Edge',
  //     y: 4.67
  //   }, {
  //     name: 'Safari',
  //     y: 4.18
  //   }, {
  //     name: 'Sogou Explorer',
  //     y: 1.64
  //   }, {
  //     name: 'Opera',
  //     y: 1.6
  //   }, {
  //     name: 'QQ',
  //     y: 1.2
  //   }, {
  //     name: 'Other',
  //     y: 2.61
  //   }];
  // }

  pieChartTwo() {
    return [{
      name: 'CDD',
      y: 35
    }, {
      name: 'IDV',
      y: 25
    },{
      name: 'Sanctions',
      y: 15
    }, {
      name: 'Risk Assessment',
      y: 12
    },{
      name: 'PEPs',
      y: 8
    }, {
      name: 'EOD',
      y: 5
    }];
  }

  lineChart()
  {
    return [{
      name: 'Installation & Developers',
      data: [43934, 48656, 65165, 81827, 112143, 142383,
          171533, 165174, 155157, 161454, 154610]
  }, {
      name: 'Manufacturing',
      data: [24916, 37941, 29742, 29851, 32490, 30282,
          38121, 36885, 33726, 34243, 31050]
  }, {
      name: 'Sales & Distribution',
      data: [11744, 30000, 16005, 19771, 20185, 24377,
          32147, 30912, 29243, 29213, 25663]
  }, {
      name: 'Operations & Maintenance',
      data: [null, null, null, null, null, null, null,
          null, 11164, 11218, 10077]
  }, {
      name: 'Other',
      data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
          17300, 13053, 11906, 10073]
  }]

  }

  areaChart()
  {
    return [{
      name: 'Breaches',
      data:
          [
              38000,
              37300,
              37892,
              38564,
              36770,
              36026,
              34978,
              35657,
              35620,
              35971,
              36409,
              36435,
              34643,
              34956,
              33199,
              31136,
              30835,
              31611,
              30666,
              30319,
              31766
          ]
  }, {
      name: 'Failures',
      data:
          [
              22534,
              23599,
              24533,
              25195,
              25896,
              27635,
              29173,
              32646,
              35686,
              37709,
              39143,
              36829,
              35031,
              36202,
              35140,
              33718,
              37773,
              42556,
              43820,
              46445,
              50048
          ]
  }]
  }

  multiBarChart(){
    return [{
      name: 'Tokyo',
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
          194.1, 95.6, 54.4]

  }, {
      name: 'New York',
      data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5,
          106.6, 92.3]

  }, {
      name: 'London',
      data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3,
          51.2]

  }, {
      name: 'Berlin',
      data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8,
          51.1]

  }]
  }

}
