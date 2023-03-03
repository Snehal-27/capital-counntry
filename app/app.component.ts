import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  countries = [
    { name: 'Australia', capital: 'Canberra' },
    { name: 'Brazil', capital: 'Brasília' },
    { name: 'Canada', capital: 'Ottawa' },
    { name: 'China', capital: 'Beijing' },
    { name: 'France', capital: 'Paris' },
    { name: 'India', capital: 'New Delhi' },
    { name: 'Italy', capital: 'Rome' },
    { name: 'Japan', capital: 'Tokyo' },
    { name: 'Mexico', capital: 'Mexico City' },
    { name: 'Russia', capital: 'Moscow' },
    { name: 'South Africa', capital: 'Pretoria' },
    { name: 'United Kingdom', capital: 'London' },
    { name: 'United States', capital: 'Washington D.C.' },
  ];
  country = this.getRandomCountry();
  guess: string = '';
  result: string = '';
  showResult: boolean = false;
  url = 'https://countriesnow.space/api/v0.1/countries/capital';
  httpData: any;

  getRandomCountry() {
    return this.countries[Math.floor(Math.random() * this.countries.length)];
  }

  checkGuess() {
    if (this.guess.toLowerCase() === this.country.capital.toLowerCase()) {
      this.result = 'Correct!';
    } else {
      this.result = `Sorry, the capital of ${this.country.name} is ${this.country.capital}.`;
    }
    this.showResult = true;
  }
  ngOnInit() {
    this.http
      .get<any[]>('https://countriesnow.space/api/v0.1/countries/capital')
      .subscribe(
        (data) => {
          this.httpData = data;
          this.httpData.data.forEach((country) => {
            this.countries.push({
              name: country.name,
              capital: country.capital,
            });
          });
        },
        (error) => console.error(error)
      );
  }
}
