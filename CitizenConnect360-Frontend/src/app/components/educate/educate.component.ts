import { Component } from '@angular/core';
import { UploadService } from '../../services/pdfUpload/upload.service';
import { ChatService } from '../../services/chat/chat.service';

@Component({
  selector: 'app-educate',
  standalone: true,
  imports: [],
  templateUrl: './educate.component.html',
  styleUrl: './educate.component.css'
})
export class EducateComponent {
  selectedFiles!: FileList
  pdfId!: string
  userId!: string
  userMessage!: string
  aiResponse!: string

  constructor(
    private uploadService: UploadService,
    private chatService: ChatService
  ) { }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadPDF() {
    this.uploadService.uploadPDF(this.selectedFiles).subscribe((response: any) => {
      this.pdfId = response.pdf_id;
    });

  }

  // chat() {
  //   this.chatService.chatWithPDF(this.userId, this.pdfId, this.userMessage).subscribe((response: any) => {
  //   this.aiResponse = response.ai_response;
  //   });
  //   }

}
