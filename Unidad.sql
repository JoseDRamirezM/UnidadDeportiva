/*==============================================================*/
/* DBMS name:      ORACLE Version 12c                           */
/* Created on:     5/08/2022 5:52:43 p. m.                      */
/*==============================================================*/


alter table ASISMIEMBROEQUIPO
   drop constraint FK_ASISMIEM_ASME_PRO_PROGRAMA;

alter table ASISMIEMBROEQUIPO
   drop constraint FK_ASISMIEM_ME_AME_MIEMBROE;

alter table ASISTIRRESPONSABLE
   drop constraint FK_ASISTIRR_RES_ASRE_RESPONSA;

alter table ELEMENDEPORTIVO
   drop constraint FK_ELEMENDE_ESP_ELDE_ESPACIO;

alter table ELEMENDEPORTIVO
   drop constraint FK_ELEMENDE_EST_ELDE_ESTADO;

alter table ELEMENDEPORTIVO
   drop constraint FK_ELEMENDE_MAR_ELDE_MARCA;

alter table ELEMENDEPORTIVO
   drop constraint FK_ELEMENDE_TIEL_ELDE_TIPOELEM;

alter table EMPLEADO_CARGO
   drop constraint FK_EMPLEADO_CAR_EMCA_CARGO;

alter table EMPLEADO_CARGO
   drop constraint FK_EMPLEADO_EMP_EMCA_EMPLEADO;

alter table EMPLEADO_CARGO
   drop constraint FK_EMPLEADO_ESP_EMCA_ESPACIO;

alter table EQUIPO
   drop constraint FK_EQUIPO_DEP_EQU_DEPORTE;

alter table EQUIPO
   drop constraint FK_EQUIPO_EMP_EQU_EMPLEADO;

alter table ESPACIO
   drop constraint FK_ESPACIO_ESP_ESP_ESPACIO;

alter table ESPACIO
   drop constraint FK_ESPACIO_TIP_ESP_TIPOESPA;

alter table ESP_DEP
   drop constraint FK_ESP_DEP_ESP_DEP_ESPACIO;

alter table ESP_DEP
   drop constraint FK_ESP_DEP_ESP_DEP2_DEPORTE;

alter table ESTUDIANTE
   drop constraint FK_ESTUDIAN_EST_ESP_ESPACIO;

alter table INSCRITOPRACLIBRE
   drop constraint FK_INSCRITO_EST_INPL_ESTUDIAN;

alter table INSCRITOPRACLIBRE
   drop constraint FK_INSCRITO_INPL_EMP_EMPLEADO;

alter table INSCRITOPRACLIBRE
   drop constraint FK_INSCRITO_INPL_PRO_PROGRAMA;

alter table MIEMBROEQUIPO
   drop constraint FK_MIEMBROE_EST_MIEQ_ESTUDIAN;

alter table MIEMBROEQUIPO
   drop constraint FK_MIEMBROE_E_ME_EQUIPO;

alter table PRESTAMO
   drop constraint FK_PRESTAMO_ASRE_PRE_ASISTIRR;

alter table PRESTAMO
   drop constraint FK_PRESTAMO_PRE_ELDE_ELEMENDE;

alter table PROGRAMACION
   drop constraint FK_PROGRAMA_ACT_PRO_ACTIVIDA;

alter table PROGRAMACION
   drop constraint FK_PROGRAMA_DEP_PRO_DEPORTE;

alter table PROGRAMACION
   drop constraint FK_PROGRAMA_DIA_PRO_DIA;

alter table PROGRAMACION
   drop constraint FK_PROGRAMA_ESP_PRO_ESPACIO;

alter table PROGRAMACION
   drop constraint FK_PROGRAMA_HOR_PRO_HORA;

alter table PROGRAMACION
   drop constraint FK_PROGRAMA_HOR_PRO1_HORA;

alter table PROGRAMACION
   drop constraint FK_PROGRAMA_PER_PRO_PERIODO;

alter table RESPONSABLE
   drop constraint FK_RESPONSA_EMP_RES_EMPLEADO;

alter table RESPONSABLE
   drop constraint FK_RESPONSA_EST_RES_ESTUDIAN;

alter table RESPONSABLE
   drop constraint FK_RESPONSA_PRO_RES_PROGRAMA;

alter table RESPONSABLE
   drop constraint FK_RESPONSA_ROL_RES_ROL;

alter table TIEL_DEP
   drop constraint FK_TIEL_DEP_TIEL_DEP_TIPOELEM;

alter table TIEL_DEP
   drop constraint FK_TIEL_DEP_TIEL_DEP2_DEPORTE;

drop table ACTIVIDAD cascade constraints;

drop index ASME_PRO_FK;

drop index ME_AME_FK;

drop table ASISMIEMBROEQUIPO cascade constraints;

drop index RES_ASRE_FK;

drop table ASISTIRRESPONSABLE cascade constraints;

drop table CARGO cascade constraints;

drop table DEPORTE cascade constraints;

drop table DIA cascade constraints;

drop index ESP_ELDE_FK;

drop index MAR_ELDE_FK;

drop index EST_ELDE_FK;

drop index TIEL_ELDE_FK;

drop table ELEMENDEPORTIVO cascade constraints;

drop table EMPLEADO cascade constraints;

drop index EMP_EMCA_FK;

drop index CAR_EMCA_FK;

drop index ESP_EMCA_FK;

drop table EMPLEADO_CARGO cascade constraints;

drop index DEP_EQU_FK;

drop index EMP_EQU_FK;

drop table EQUIPO cascade constraints;

drop index ESP_ESP_FK;

drop index TIP_ESP_FK;

drop table ESPACIO cascade constraints;

drop index ESP_DEP2_FK;

drop index ESP_DEP_FK;

drop table ESP_DEP cascade constraints;

drop table ESTADO cascade constraints;

drop index EST_ESP_FK;

drop table ESTUDIANTE cascade constraints;

drop table HORA cascade constraints;

drop index INPL_PRO_FK;

drop index EST_INPL_FK;

drop index INPL_EMP_FK;

drop table INSCRITOPRACLIBRE cascade constraints;

drop table MARCA cascade constraints;

drop index EST_MIEQ_FK;

drop index E_ME_FK;

drop table MIEMBROEQUIPO cascade constraints;

drop table PERIODO cascade constraints;

drop index ASRE_PRE_FK;

drop index PRE_ELDE_FK;

drop table PRESTAMO cascade constraints;

drop index HOR_PRO1_FK;

drop index DIA_PRO_FK;

drop index HOR_PRO_FK;

drop index ACT_PRO_FK;

drop index PER_PRO_FK;

drop index DEP_PRO_FK;

drop index ESP_PRO_FK;

drop table PROGRAMACION cascade constraints;

drop index EST_RES_FK;

drop index PRO_RES_FK;

drop index ROL_RES_FK;

drop index EMP_RES_FK;

drop table RESPONSABLE cascade constraints;

drop table ROL cascade constraints;

drop index TIEL_DEP2_FK;

drop index TIEL_DEP_FK;

drop table TIEL_DEP cascade constraints;

drop table TIPOELEMENTO cascade constraints;

drop table TIPOESPACIO cascade constraints;

/*==============================================================*/
/* Table: ACTIVIDAD                                             */
/*==============================================================*/
create table ACTIVIDAD (
   IDACTIVIDAD          VARCHAR2(2)           not null,
   DESCACTIVIDAD        VARCHAR2(30)          not null,
   constraint PK_ACTIVIDAD primary key (IDACTIVIDAD)
);

/*==============================================================*/
/* Table: ASISMIEMBROEQUIPO                                     */
/*==============================================================*/
create table ASISMIEMBROEQUIPO (
   CONSECPROGRA         NUMBER(4,0)           not null,
   CONMIEMEQUIPO        NUMBER(4,0)           not null,
   CONSEEQUIPO          NUMBER(3,0)           not null,
   ITEMMIEMBRO          NUMBER(3,0)           not null,
   constraint PK_ASISMIEMBROEQUIPO primary key (CONSECPROGRA, CONMIEMEQUIPO)
);

/*==============================================================*/
/* Index: ME_AME_FK                                             */
/*==============================================================*/
create index ME_AME_FK on ASISMIEMBROEQUIPO (
   CONSEEQUIPO ASC,
   ITEMMIEMBRO ASC
);

/*==============================================================*/
/* Index: ASME_PRO_FK                                           */
/*==============================================================*/
create index ASME_PRO_FK on ASISMIEMBROEQUIPO (
   CONSECPROGRA ASC
);

/*==============================================================*/
/* Table: ASISTIRRESPONSABLE                                    */
/*==============================================================*/
create table ASISTIRRESPONSABLE (
   CONSECPROGRA         NUMBER(4,0)           not null,
   CONSECRES            NUMBER(4,0)           not null,
   CONSECASISRES        NUMBER(4,0)           not null,
   FECHAASISRES         DATE                  not null,
   HORAASISRES          DATE                  not null,
   constraint PK_ASISTIRRESPONSABLE primary key (CONSECPROGRA, CONSECRES, CONSECASISRES)
);

/*==============================================================*/
/* Index: RES_ASRE_FK                                           */
/*==============================================================*/
create index RES_ASRE_FK on ASISTIRRESPONSABLE (
   CONSECPROGRA ASC,
   CONSECRES ASC
);

/*==============================================================*/
/* Table: CARGO                                                 */
/*==============================================================*/
create table CARGO (
   IDCARGO              VARCHAR2(2)           not null,
   DESCARGO             VARCHAR2(30)          not null,
   constraint PK_CARGO primary key (IDCARGO)
);

/*==============================================================*/
/* Table: DEPORTE                                               */
/*==============================================================*/
create table DEPORTE (
   IDDEPORTE            VARCHAR2(2)           not null,
   NOMDEPORTE           VARCHAR2(20)          not null,
   constraint PK_DEPORTE primary key (IDDEPORTE)
);

/*==============================================================*/
/* Table: DIA                                                   */
/*==============================================================*/
create table DIA (
   IDDIA                VARCHAR2(2)           not null,
   NOMDIA               VARCHAR2(10)          not null,
   constraint PK_DIA primary key (IDDIA)
);

/*==============================================================*/
/* Table: ELEMENDEPORTIVO                                       */
/*==============================================================*/
create table ELEMENDEPORTIVO (
   CONSECELEMENTO       NUMBER(5,0)           not null,
   IDTIPOELEMENTO       VARCHAR2(2)           not null,
   CODESPACIO           VARCHAR2(2)           not null,
   IDMARCA              VARCHAR2(3)           not null,
   IDESTADO             VARCHAR2(2)           not null,
   FECHAREGISTRO        DATE                  not null,
   constraint PK_ELEMENDEPORTIVO primary key (CONSECELEMENTO)
);

/*==============================================================*/
/* Index: TIEL_ELDE_FK                                          */
/*==============================================================*/
create index TIEL_ELDE_FK on ELEMENDEPORTIVO (
   IDTIPOELEMENTO ASC
);

/*==============================================================*/
/* Index: EST_ELDE_FK                                           */
/*==============================================================*/
create index EST_ELDE_FK on ELEMENDEPORTIVO (
   IDESTADO ASC
);

/*==============================================================*/
/* Index: MAR_ELDE_FK                                           */
/*==============================================================*/
create index MAR_ELDE_FK on ELEMENDEPORTIVO (
   IDMARCA ASC
);

/*==============================================================*/
/* Index: ESP_ELDE_FK                                           */
/*==============================================================*/
create index ESP_ELDE_FK on ELEMENDEPORTIVO (
   CODESPACIO ASC
);

/*==============================================================*/
/* Table: EMPLEADO                                              */
/*==============================================================*/
create table EMPLEADO (
   CODEMPLEADO          VARCHAR2(4)           not null,
   NOMEMPLEADO          VARCHAR2(20)          not null,
   APELLEMPLEADO        VARCHAR2(20)          not null,
   FECHAREGISTRO        DATE                  not null,
   CORREOUD             VARCHAR2(30)          not null,
   constraint PK_EMPLEADO primary key (CODEMPLEADO)
);

/*==============================================================*/
/* Table: EMPLEADO_CARGO                                        */
/*==============================================================*/
create table EMPLEADO_CARGO (
   CONSEC               NUMBER(3,0)           not null,
   IDCARGO              VARCHAR2(2)           not null,
   CODESPACIO           VARCHAR2(2)           not null,
   CODEMPLEADO          VARCHAR2(4)           not null,
   FECHACARGO           DATE                  not null,
   FECHAFINCAR          DATE,
   constraint PK_EMPLEADO_CARGO primary key (CONSEC)
);

/*==============================================================*/
/* Index: ESP_EMCA_FK                                           */
/*==============================================================*/
create index ESP_EMCA_FK on EMPLEADO_CARGO (
   CODESPACIO ASC
);

/*==============================================================*/
/* Index: CAR_EMCA_FK                                           */
/*==============================================================*/
create index CAR_EMCA_FK on EMPLEADO_CARGO (
   IDCARGO ASC
);

/*==============================================================*/
/* Index: EMP_EMCA_FK                                           */
/*==============================================================*/
create index EMP_EMCA_FK on EMPLEADO_CARGO (
   CODEMPLEADO ASC
);

/*==============================================================*/
/* Table: EQUIPO                                                */
/*==============================================================*/
create table EQUIPO (
   CONSEEQUIPO          NUMBER(3,0)           not null,
   IDDEPORTE            VARCHAR2(2)           not null,
   CODEMPLEADO          VARCHAR2(4)           not null,
   FECHARESOL           DATE                  not null,
   constraint PK_EQUIPO primary key (CONSEEQUIPO)
);

/*==============================================================*/
/* Index: EMP_EQU_FK                                            */
/*==============================================================*/
create index EMP_EQU_FK on EQUIPO (
   CODEMPLEADO ASC
);

/*==============================================================*/
/* Index: DEP_EQU_FK                                            */
/*==============================================================*/
create index DEP_EQU_FK on EQUIPO (
   IDDEPORTE ASC
);

/*==============================================================*/
/* Table: ESPACIO                                               */
/*==============================================================*/
create table ESPACIO (
   CODESPACIO           VARCHAR2(2)           not null,
   IDTIPOESPACIO        VARCHAR2(2)           not null,
   ESP_CODESPACIO       VARCHAR2(2),
   NOMESPACIO           VARCHAR2(30)          not null,
   constraint PK_ESPACIO primary key (CODESPACIO)
);

/*==============================================================*/
/* Index: TIP_ESP_FK                                            */
/*==============================================================*/
create index TIP_ESP_FK on ESPACIO (
   IDTIPOESPACIO ASC
);

/*==============================================================*/
/* Index: ESP_ESP_FK                                            */
/*==============================================================*/
create index ESP_ESP_FK on ESPACIO (
   ESP_CODESPACIO ASC
);

/*==============================================================*/
/* Table: ESP_DEP                                               */
/*==============================================================*/
create table ESP_DEP (
   CODESPACIO           VARCHAR2(2)           not null,
   IDDEPORTE            VARCHAR2(2)           not null,
   constraint PK_ESP_DEP primary key (CODESPACIO, IDDEPORTE)
);

/*==============================================================*/
/* Index: ESP_DEP_FK                                            */
/*==============================================================*/
create index ESP_DEP_FK on ESP_DEP (
   CODESPACIO ASC
);

/*==============================================================*/
/* Index: ESP_DEP2_FK                                           */
/*==============================================================*/
create index ESP_DEP2_FK on ESP_DEP (
   IDDEPORTE ASC
);

/*==============================================================*/
/* Table: ESTADO                                                */
/*==============================================================*/
create table ESTADO (
   IDESTADO             VARCHAR2(2)           not null,
   DESCESTADO           VARCHAR2(20),
   constraint PK_ESTADO primary key (IDESTADO)
);

/*==============================================================*/
/* Table: ESTUDIANTE                                            */
/*==============================================================*/
create table ESTUDIANTE (
   CODESTU              VARCHAR2(12)          not null,
   CODESPACIO           VARCHAR2(2)           not null,
   NOMESTU              VARCHAR2(30)          not null,
   APELESTU             VARCHAR2(30)          not null,
   FECHAREGESTU         DATE                  not null,
   CORREOUDESTU         VARCHAR2(30)          not null,
   FECHANACESTU         DATE                  not null,
   constraint PK_ESTUDIANTE primary key (CODESTU)
);

/*==============================================================*/
/* Index: EST_ESP_FK                                            */
/*==============================================================*/
create index EST_ESP_FK on ESTUDIANTE (
   CODESPACIO ASC
);

/*==============================================================*/
/* Table: HORA                                                  */
/*==============================================================*/
create table HORA (
   IDHORA               VARCHAR2(5)           not null,
   constraint PK_HORA primary key (IDHORA)
);

/*==============================================================*/
/* Table: INSCRITOPRACLIBRE                                     */
/*==============================================================*/
create table INSCRITOPRACLIBRE (
   CONSECPROGRA         NUMBER(4,0)           not null,
   CONSECPRACT          NUMBER(4)             not null,
   CODESTU              VARCHAR2(12),
   CODEMPLEADO          VARCHAR2(4),
   constraint PK_INSCRITOPRACLIBRE primary key (CONSECPROGRA, CONSECPRACT)
);

/*==============================================================*/
/* Index: INPL_EMP_FK                                           */
/*==============================================================*/
create index INPL_EMP_FK on INSCRITOPRACLIBRE (
   CODEMPLEADO ASC
);

/*==============================================================*/
/* Index: EST_INPL_FK                                           */
/*==============================================================*/
create index EST_INPL_FK on INSCRITOPRACLIBRE (
   CODESTU ASC
);

/*==============================================================*/
/* Index: INPL_PRO_FK                                           */
/*==============================================================*/
create index INPL_PRO_FK on INSCRITOPRACLIBRE (
   CONSECPROGRA ASC
);

/*==============================================================*/
/* Table: MARCA                                                 */
/*==============================================================*/
create table MARCA (
   IDMARCA              VARCHAR2(3)           not null,
   NOMMARCA             VARCHAR2(20)          not null,
   constraint PK_MARCA primary key (IDMARCA)
);

/*==============================================================*/
/* Table: MIEMBROEQUIPO                                         */
/*==============================================================*/
create table MIEMBROEQUIPO (
   CONSEEQUIPO          NUMBER(3,0)           not null,
   ITEMMIEMBRO          NUMBER(3,0)           not null,
   CODESTU              VARCHAR2(12)          not null,
   constraint PK_MIEMBROEQUIPO primary key (CONSEEQUIPO, ITEMMIEMBRO)
);

/*==============================================================*/
/* Index: E_ME_FK                                               */
/*==============================================================*/
create index E_ME_FK on MIEMBROEQUIPO (
   CONSEEQUIPO ASC
);

/*==============================================================*/
/* Index: EST_MIEQ_FK                                           */
/*==============================================================*/
create index EST_MIEQ_FK on MIEMBROEQUIPO (
   CODESTU ASC
);

/*==============================================================*/
/* Table: PERIODO                                               */
/*==============================================================*/
create table PERIODO (
   IDPERIODO            VARCHAR2(5)           not null,
   constraint PK_PERIODO primary key (IDPERIODO)
);

/*==============================================================*/
/* Table: PRESTAMO                                              */
/*==============================================================*/
create table PRESTAMO (
   CONSECPRESTAMO       NUMBER(4,0)           not null,
   CONSECELEMENTO       NUMBER(5,0)           not null,
   CONSECPROGRA         NUMBER(4,0)           not null,
   CONSECRES            NUMBER(4,0)           not null,
   CONSECASISRES        NUMBER(4,0)           not null,
   constraint PK_PRESTAMO primary key (CONSECPRESTAMO)
);

/*==============================================================*/
/* Index: PRE_ELDE_FK                                           */
/*==============================================================*/
create index PRE_ELDE_FK on PRESTAMO (
   CONSECELEMENTO ASC
);

/*==============================================================*/
/* Index: ASRE_PRE_FK                                           */
/*==============================================================*/
create index ASRE_PRE_FK on PRESTAMO (
   CONSECPROGRA ASC,
   CONSECRES ASC,
   CONSECASISRES ASC
);

/*==============================================================*/
/* Table: PROGRAMACION                                          */
/*==============================================================*/
create table PROGRAMACION (
   CONSECPROGRA         NUMBER(4,0)           not null,
   CODESPACIO           VARCHAR2(2)           not null,
   IDHORA               VARCHAR2(5)           not null,
   IDDEPORTE            VARCHAR2(2)           not null,
   IDACTIVIDAD          VARCHAR2(2)           not null,
   IDDIA                VARCHAR2(2)           not null,
   HOR_IDHORA           VARCHAR2(5)           not null,
   IDPERIODO            VARCHAR2(5)           not null,
   CUPO                 NUMBER(3,0)           not null,
   NOINSCRITO           NUMBER(3,0),
   constraint PK_PROGRAMACION primary key (CONSECPROGRA)
);

/*==============================================================*/
/* Index: ESP_PRO_FK                                            */
/*==============================================================*/
create index ESP_PRO_FK on PROGRAMACION (
   CODESPACIO ASC
);

/*==============================================================*/
/* Index: DEP_PRO_FK                                            */
/*==============================================================*/
create index DEP_PRO_FK on PROGRAMACION (
   IDDEPORTE ASC
);

/*==============================================================*/
/* Index: PER_PRO_FK                                            */
/*==============================================================*/
create index PER_PRO_FK on PROGRAMACION (
   IDPERIODO ASC
);

/*==============================================================*/
/* Index: ACT_PRO_FK                                            */
/*==============================================================*/
create index ACT_PRO_FK on PROGRAMACION (
   IDACTIVIDAD ASC
);

/*==============================================================*/
/* Index: HOR_PRO_FK                                            */
/*==============================================================*/
create index HOR_PRO_FK on PROGRAMACION (
   HOR_IDHORA ASC
);

/*==============================================================*/
/* Index: DIA_PRO_FK                                            */
/*==============================================================*/
create index DIA_PRO_FK on PROGRAMACION (
   IDDIA ASC
);

/*==============================================================*/
/* Index: HOR_PRO1_FK                                           */
/*==============================================================*/
create index HOR_PRO1_FK on PROGRAMACION (
   IDHORA ASC
);

/*==============================================================*/
/* Table: RESPONSABLE                                           */
/*==============================================================*/
create table RESPONSABLE (
   CONSECPROGRA         NUMBER(4,0)           not null,
   CONSECRES            NUMBER(4,0)           not null,
   CODEMPLEADO          VARCHAR2(4)           not null,
   CODESTU              VARCHAR2(12),
   IDROL                VARCHAR2(1),
   FECHAINI             DATE                  not null,
   FECHAFIN             DATE                  not null,
   constraint PK_RESPONSABLE primary key (CONSECPROGRA, CONSECRES)
);

/*==============================================================*/
/* Index: EMP_RES_FK                                            */
/*==============================================================*/
create index EMP_RES_FK on RESPONSABLE (
   CODEMPLEADO ASC
);

/*==============================================================*/
/* Index: ROL_RES_FK                                            */
/*==============================================================*/
create index ROL_RES_FK on RESPONSABLE (
   IDROL ASC
);

/*==============================================================*/
/* Index: PRO_RES_FK                                            */
/*==============================================================*/
create index PRO_RES_FK on RESPONSABLE (
   CONSECPROGRA ASC
);

/*==============================================================*/
/* Index: EST_RES_FK                                            */
/*==============================================================*/
create index EST_RES_FK on RESPONSABLE (
   CODESTU ASC
);

/*==============================================================*/
/* Table: ROL                                                   */
/*==============================================================*/
create table ROL (
   IDROL                VARCHAR2(1)           not null,
   DESCROL              VARCHAR2(20)          not null,
   constraint PK_ROL primary key (IDROL)
);

/*==============================================================*/
/* Table: TIEL_DEP                                              */
/*==============================================================*/
create table TIEL_DEP (
   IDTIPOELEMENTO       VARCHAR2(2)           not null,
   IDDEPORTE            VARCHAR2(2)           not null,
   constraint PK_TIEL_DEP primary key (IDTIPOELEMENTO, IDDEPORTE)
);

/*==============================================================*/
/* Index: TIEL_DEP_FK                                           */
/*==============================================================*/
create index TIEL_DEP_FK on TIEL_DEP (
   IDTIPOELEMENTO ASC
);

/*==============================================================*/
/* Index: TIEL_DEP2_FK                                          */
/*==============================================================*/
create index TIEL_DEP2_FK on TIEL_DEP (
   IDDEPORTE ASC
);

/*==============================================================*/
/* Table: TIPOELEMENTO                                          */
/*==============================================================*/
create table TIPOELEMENTO (
   IDTIPOELEMENTO       VARCHAR2(2)           not null,
   DESCTIPOELEMENTO     VARCHAR2(40)          not null,
   constraint PK_TIPOELEMENTO primary key (IDTIPOELEMENTO)
);

/*==============================================================*/
/* Table: TIPOESPACIO                                           */
/*==============================================================*/
create table TIPOESPACIO (
   IDTIPOESPACIO        VARCHAR2(2)           not null,
   DESCTIPOESPACIO      VARCHAR2(30)          not null,
   constraint PK_TIPOESPACIO primary key (IDTIPOESPACIO)
);

alter table ASISMIEMBROEQUIPO
   add constraint FK_ASISMIEM_ASME_PRO_PROGRAMA foreign key (CONSECPROGRA)
      references PROGRAMACION (CONSECPROGRA);

alter table ASISMIEMBROEQUIPO
   add constraint FK_ASISMIEM_ME_AME_MIEMBROE foreign key (CONSEEQUIPO, ITEMMIEMBRO)
      references MIEMBROEQUIPO (CONSEEQUIPO, ITEMMIEMBRO);

alter table ASISTIRRESPONSABLE
   add constraint FK_ASISTIRR_RES_ASRE_RESPONSA foreign key (CONSECPROGRA, CONSECRES)
      references RESPONSABLE (CONSECPROGRA, CONSECRES);

alter table ELEMENDEPORTIVO
   add constraint FK_ELEMENDE_ESP_ELDE_ESPACIO foreign key (CODESPACIO)
      references ESPACIO (CODESPACIO);

alter table ELEMENDEPORTIVO
   add constraint FK_ELEMENDE_EST_ELDE_ESTADO foreign key (IDESTADO)
      references ESTADO (IDESTADO);

alter table ELEMENDEPORTIVO
   add constraint FK_ELEMENDE_MAR_ELDE_MARCA foreign key (IDMARCA)
      references MARCA (IDMARCA);

alter table ELEMENDEPORTIVO
   add constraint FK_ELEMENDE_TIEL_ELDE_TIPOELEM foreign key (IDTIPOELEMENTO)
      references TIPOELEMENTO (IDTIPOELEMENTO);

alter table EMPLEADO_CARGO
   add constraint FK_EMPLEADO_CAR_EMCA_CARGO foreign key (IDCARGO)
      references CARGO (IDCARGO);

alter table EMPLEADO_CARGO
   add constraint FK_EMPLEADO_EMP_EMCA_EMPLEADO foreign key (CODEMPLEADO)
      references EMPLEADO (CODEMPLEADO);

alter table EMPLEADO_CARGO
   add constraint FK_EMPLEADO_ESP_EMCA_ESPACIO foreign key (CODESPACIO)
      references ESPACIO (CODESPACIO);

alter table EQUIPO
   add constraint FK_EQUIPO_DEP_EQU_DEPORTE foreign key (IDDEPORTE)
      references DEPORTE (IDDEPORTE);

alter table EQUIPO
   add constraint FK_EQUIPO_EMP_EQU_EMPLEADO foreign key (CODEMPLEADO)
      references EMPLEADO (CODEMPLEADO);

alter table ESPACIO
   add constraint FK_ESPACIO_ESP_ESP_ESPACIO foreign key (ESP_CODESPACIO)
      references ESPACIO (CODESPACIO);

alter table ESPACIO
   add constraint FK_ESPACIO_TIP_ESP_TIPOESPA foreign key (IDTIPOESPACIO)
      references TIPOESPACIO (IDTIPOESPACIO);

alter table ESP_DEP
   add constraint FK_ESP_DEP_ESP_DEP_ESPACIO foreign key (CODESPACIO)
      references ESPACIO (CODESPACIO);

alter table ESP_DEP
   add constraint FK_ESP_DEP_ESP_DEP2_DEPORTE foreign key (IDDEPORTE)
      references DEPORTE (IDDEPORTE);

alter table ESTUDIANTE
   add constraint FK_ESTUDIAN_EST_ESP_ESPACIO foreign key (CODESPACIO)
      references ESPACIO (CODESPACIO);

alter table INSCRITOPRACLIBRE
   add constraint FK_INSCRITO_EST_INPL_ESTUDIAN foreign key (CODESTU)
      references ESTUDIANTE (CODESTU);

alter table INSCRITOPRACLIBRE
   add constraint FK_INSCRITO_INPL_EMP_EMPLEADO foreign key (CODEMPLEADO)
      references EMPLEADO (CODEMPLEADO);

alter table INSCRITOPRACLIBRE
   add constraint FK_INSCRITO_INPL_PRO_PROGRAMA foreign key (CONSECPROGRA)
      references PROGRAMACION (CONSECPROGRA);

alter table MIEMBROEQUIPO
   add constraint FK_MIEMBROE_EST_MIEQ_ESTUDIAN foreign key (CODESTU)
      references ESTUDIANTE (CODESTU);

alter table MIEMBROEQUIPO
   add constraint FK_MIEMBROE_E_ME_EQUIPO foreign key (CONSEEQUIPO)
      references EQUIPO (CONSEEQUIPO);

alter table PRESTAMO
   add constraint FK_PRESTAMO_ASRE_PRE_ASISTIRR foreign key (CONSECPROGRA, CONSECRES, CONSECASISRES)
      references ASISTIRRESPONSABLE (CONSECPROGRA, CONSECRES, CONSECASISRES);

alter table PRESTAMO
   add constraint FK_PRESTAMO_PRE_ELDE_ELEMENDE foreign key (CONSECELEMENTO)
      references ELEMENDEPORTIVO (CONSECELEMENTO);

alter table PROGRAMACION
   add constraint FK_PROGRAMA_ACT_PRO_ACTIVIDA foreign key (IDACTIVIDAD)
      references ACTIVIDAD (IDACTIVIDAD);

alter table PROGRAMACION
   add constraint FK_PROGRAMA_DEP_PRO_DEPORTE foreign key (IDDEPORTE)
      references DEPORTE (IDDEPORTE);

alter table PROGRAMACION
   add constraint FK_PROGRAMA_DIA_PRO_DIA foreign key (IDDIA)
      references DIA (IDDIA);

alter table PROGRAMACION
   add constraint FK_PROGRAMA_ESP_PRO_ESPACIO foreign key (CODESPACIO)
      references ESPACIO (CODESPACIO);

alter table PROGRAMACION
   add constraint FK_PROGRAMA_HOR_PRO_HORA foreign key (HOR_IDHORA)
      references HORA (IDHORA);

alter table PROGRAMACION
   add constraint FK_PROGRAMA_HOR_PRO1_HORA foreign key (IDHORA)
      references HORA (IDHORA);

alter table PROGRAMACION
   add constraint FK_PROGRAMA_PER_PRO_PERIODO foreign key (IDPERIODO)
      references PERIODO (IDPERIODO);

alter table RESPONSABLE
   add constraint FK_RESPONSA_EMP_RES_EMPLEADO foreign key (CODEMPLEADO)
      references EMPLEADO (CODEMPLEADO);

alter table RESPONSABLE
   add constraint FK_RESPONSA_EST_RES_ESTUDIAN foreign key (CODESTU)
      references ESTUDIANTE (CODESTU);

alter table RESPONSABLE
   add constraint FK_RESPONSA_PRO_RES_PROGRAMA foreign key (CONSECPROGRA)
      references PROGRAMACION (CONSECPROGRA);

alter table RESPONSABLE
   add constraint FK_RESPONSA_ROL_RES_ROL foreign key (IDROL)
      references ROL (IDROL);

alter table TIEL_DEP
   add constraint FK_TIEL_DEP_TIEL_DEP_TIPOELEM foreign key (IDTIPOELEMENTO)
      references TIPOELEMENTO (IDTIPOELEMENTO);

alter table TIEL_DEP
   add constraint FK_TIEL_DEP_TIEL_DEP2_DEPORTE foreign key (IDDEPORTE)
      references DEPORTE (IDDEPORTE);

