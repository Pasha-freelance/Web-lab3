import { Component } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { LocalStorageService } from "../localstorage.service";

interface ITodo {
  id: string;
  description: string;
  date: string;
}

@Component({
  selector: 'todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.css']
})
export class TodoMainComponent {

  todos: ITodo[] = [];

  form = this.fb.group({
    description: [],
    date: []
  });

  constructor(
    private modalService: NgbModal,
    private lsService: LocalStorageService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.todos = JSON.parse(this.lsService.get('todos') || '')
  }

  openModal(instance: any) {
    this.modalService.open(instance);
  }

  closeModal() {
    this.modalService.dismissAll()
  }

  onRemoveTodo(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.lsService.set('todos', JSON.stringify(this.todos));
  }

  onAddToDo() {
    this.todos.push({ ...this.form.getRawValue(), id: (Math.floor(Math.random() * 100000)).toString() });
    this.lsService.set('todos', JSON.stringify(this.todos));
    this.form.patchValue({
      description: '',
      date: ''
    });
    this.closeModal();
  }
}
