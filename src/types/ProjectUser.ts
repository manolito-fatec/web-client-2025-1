export type ProjectUser={
    userId:number;
    userName:string;
    projectId:string;
    projectName:string;
}

export type ProjectDetails={
    projectId:string;
    projectName:string;
}

export type ProjectTaskCount = {
  projectName: string;
  projectId: string;
  count: number;
}