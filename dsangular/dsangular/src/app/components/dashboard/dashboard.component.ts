import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, BarController, ChartData, ChartOptions, LinearScale } from 'chart.js';

// Register necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chartElement!: ElementRef;

  chart: Chart | undefined;

  months: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  stats = new BehaviorSubject<{ totalIncome: number, totalDepenses: number }>({ totalIncome: 0, totalDepenses: 0 });
  monthlyData = new BehaviorSubject<{ revenues: number, depenses: number, month: string }>({ revenues: 0, depenses: 0, month: this.months[new Date().getMonth()] });
  
  beneficeData = new BehaviorSubject<{ totalBenefice: number, monthlyBenefice: number }>({ totalBenefice: 0, monthlyBenefice: 0 });

  isAdmin = false;

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Revenus', backgroundColor: '#34D399' },
      { data: [], label: 'Dépenses', backgroundColor: '#F87171' }
    ]
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.isAdmin = localStorage.getItem("user") === "admin";

    this.http.get<any>('http://localhost:8000/api/dashboard-stats').subscribe(data => {
      this.stats.next(data);
    });

    this.http.get<any>('http://localhost:8000/api/benefice/total').subscribe(data => {
      this.beneficeData.next({
        totalBenefice: data.totalBenefice,
        monthlyBenefice: 0 
      });
    });

    this.fetchMonthlyData(this.months[new Date().getMonth()]);
  }

  fetchMonthlyData(selectedMonth: string) {
    const monthIndex = this.months.indexOf(selectedMonth) + 1;
    const year = new Date().getFullYear().toString();
  
    this.http.get<any>('http://localhost:8000/api/monthly-data', {
      params: { month: monthIndex.toString(), year }
    }).subscribe(data => {
      this.monthlyData.next({
        revenues: parseFloat(data.revenues),
        depenses: parseFloat(data.depenses),
        month: this.months[monthIndex - 1]
      });
  
      this.http.get<any>('http://localhost:8000/api/benefice/monthly', {
        params: { month: monthIndex.toString(), year }
      }).subscribe(beneficeData => {
        this.beneficeData.next({
          totalBenefice: this.beneficeData.value.totalBenefice,
          monthlyBenefice: parseFloat(beneficeData.monthlyBenefice)
        });
  
        this.updateChartData(selectedMonth, data.revenues, data.depenses, beneficeData.monthlyBenefice, this.beneficeData.value.totalBenefice);
      });
    });
  }

  updateChartData(selectedMonth: string, revenues: number, depenses: number, monthlyBenefice: number,totalBenefice: number) {
    this.chartData = {
      labels: [selectedMonth],
      datasets: [
        { data: [revenues], label: 'Revenus', backgroundColor: '#34D399' },
        { data: [depenses], label: 'Dépenses', backgroundColor: '#F87171' },
        { data: [monthlyBenefice], label: 'Bénéfice Mensuel', backgroundColor: '#60A5FA' },
        { data: [totalBenefice], label: 'Bénéfice Mensuel', backgroundColor: '#68ff33' }
      ]
    };
  
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }
  
  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
  
    this.chart = new Chart(this.chartElement.nativeElement, {
      type: 'bar',
      data: this.chartData,
      options: this.chartOptions
    });
  }
}
