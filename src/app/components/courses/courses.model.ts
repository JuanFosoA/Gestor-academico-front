import { DiaSemana } from "./courses.component";

export interface Course {
    id: number;
    nombre: string;
    descripcion: string;
    prerrequisitos?: number[];
    dia: DiaSemana;
    horaInicio: string;
    horaFin: string;
    departmentId: number;
}