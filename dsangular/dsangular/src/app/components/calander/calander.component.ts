import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { RenderVousService } from 'src/Services/render-vous.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calander',
  templateUrl: './calander.component.html',
  styleUrls: ['./calander.component.css']
})
export class CalanderComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    eventClick: this.handleEventClick.bind(this), // Gestion du clic sur un rendez-vous
  };

  constructor(private rendezvousService: RenderVousService) {}

  ngOnInit() {
    this.loadRendezvous();
  }

  loadRendezvous() {
    this.rendezvousService.getRendezvous(1, 10).subscribe({
      next: (data: any) => {
        this.calendarOptions.events = data.rendezVous.map((rdv: any) => ({
          title: `👨‍⚕️ ${rdv.patient.nom} ${rdv.patient.prenom}`,
          start: rdv.date_time,
          backgroundColor: this.getEventColor(rdv.statut),
          borderColor: this.getEventBorderColor(rdv.statut),
          extendedProps: { 
            patient: rdv.patient,
            statut: rdv.statut,
            montant: rdv.montant
          }
        }));
      },
      error: (err) => {
        console.error("Erreur lors du chargement des rendez-vous:", err);
        alert("Impossible de charger les rendez-vous !");
      }
    });
  }

  getEventColor(status: string): string {
    switch (status) {
      case 'terminé': return 'green';
      case 'annulé': return 'red';
      default: return 'blue';
    }
  }

  getEventBorderColor(status: string): string {
    switch (status) {
      case 'terminé': return 'darkgreen';
      case 'annulé': return 'darkred';
      default: return 'darkblue';
    }
  }

  handleEventClick(info: any) {
    const eventDetails = info.event.extendedProps;
    alert(`📅 Rendez-vous avec ${eventDetails.patient.nom} ${eventDetails.patient.prenom}
🕒 Date: ${info.event.start}
💵 Montant: ${eventDetails.montant}€
📌 Statut: ${eventDetails.statut}`);
  }
}