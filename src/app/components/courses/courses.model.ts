import { DiaSemana } from "./courses.component";

export interface Course {
    id: number;
    nombre: string;
    descripcion: string;
    prerrequisitos?: { id: number; nombre: string }[];
    dia: DiaSemana;
    horaInicio: string;
    horaFin: string;
    departmentId: number;
}