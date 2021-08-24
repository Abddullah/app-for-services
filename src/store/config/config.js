var selectedLanguage = "eng";
// eng for english
// pur for purtages

var strInReqLan;

if (selectedLanguage === "eng") {
    strInReqLan = {

        learnMore: "Learn More",
        helloWorld: 'Hello World!',
        userName: 'User Name',
        companyName: 'Company Name',
        email: 'Email',
        companyEmail: ' Company Email',
        password: 'Password',
        companyPassword: 'Company Password',
        repeatePassword: 'Repeate Password',
        repeateCompanyPassword: 'Repeate Company Password',
        joinApp: 'Signup',
        hvUalrAcc: 'Have you already account?',
        createNewAcc: 'Create new account?',
        login: 'LOGIN',
        unSubscribeForButton: 'UNSUBSCRIBE?',
        textArea: 'Reason for unsubscribe?',
        forgetYourPassword: 'Forgot password?',
        unSubscribe: 'Unsubscribe?',
        sendEmail: 'Send Email',
        telephoneNumber: 'Telephone Number',
        companyTelephoneNumber: 'Company Tel Number',
        readTermsOfUse: "@–read terms of use",
        company: "Company",
        companyForDatabase: "company",
        signUpAs: "Signup as",
        collaborator: "Collaborator",
        collaboratorForDatabase: "collaborator",
        errState: "Please type reason for unsubscribe",
        yourAccDeactivate: "Your account has been deactivated",
        alreadyAccDeactivate: "This account already deactivated",
        backToTheLoginPage: "Back to the login page",
        search: "Search",
        createNewJobs: "Jobs",
        createNewAdmServices: "Administrative services",
        jobTitle: "Job title",
        status: "Status",
        address: "Address",
        begginingDate: "Beggining date",
        contractNoOfJob: "Contract number of the job",
        responsibleName: "Responsible name",
        responsibleNumber: "Responsible number",
        expTermDate: "Expected termination date",
        notStarted: "Not Started (Active)",
        initiad: "Initiad (Active)",
        parallized: "Parallized in progress (Active)",
        concluded: "Concluded (Inactive)",
        backToHomePage: "Back to home page",
        postJob: "Post job",
        serTitle: "Service title",
        active: "Active",
        inActive: "Inactive",
        allFields: "All fields are required",
        jobCreateSuc: "Job succesfully create",
        feeds: "Feeds",
        view: "View Post",
        postRequest: "Post a request",
        submitPost: "Submit your post",
        type: "Type",
        update: "Update",
        updatePost: "Update post",
        postHasBeenDlt: "Post has been delete",
        postHasBeenEdt: "Post has been edit",
        clear: "Clear",
        signature: "Signature",
        next: "Next",
        selectJob: "Select Job",
        selectService: "Select Service",


        tapToDelete: "Tap to delete option:",
        goBack: "Go back",
        editOption: "Edit option",
        createOption: "Create option",
        createOptionSave: "Create option / save",
        optionCreated: "Option created",
        optionUpdated: "Option updated",
        optionDeleted: "Option deleted",
        preregistration: "Pre registration",
        selectpreregistration: "Select Pre registration",
        postPreRegistration: "Post pre-registration",
        serviceYouHaveDone: "SERVICE YOU HAVE DONE",
        dateOfBeggingOfTheOccurrence: "DATE AND TIME OF BEGGINING OF THE OCCURRENCE",
        dateOfEndOfTheOccurrence: "DATE AND TIME OF THE END OF THE OCCURRENCE",



        // *************************** Pr jobs ************************//
        jobService: "Job/Service",
        reportThat: "REPORT THAT",
        discipline: "DISCIPLINE",
        requestThat: "REQUEST THAT",
        requester: "REQUESTER",
        occurrence: "OCCURRENCE",
        area_tag_local: "AREA-TAG-LOCAL",
        specialEquipmentApplied: "SPECIAL EQUIPMENT APPLIED",
        interventionType: "INTERVENTION TYPE",
        climate: "CLIMATE",
        DontApply: "Don't Apply",
        thereWasADelay: "THERE WAS A DELAY",
        applicationScheme: "APPLICATION SCHEME",
        delayedTime: "DELAYED TIME",
        scope: "SCOPE",
        materialApplie: "MATERIAL APPLIED",
        materialAvailable: "MATERIAL AVAILABLE",
        timeSpent: "TIME SPENT",
        numberOfProfessionalsInvolved: "NUMBER OF PROFESSIONALS INVOLVED",
        reasonForDelay: "REASON FOR DELAY",
        inspectionResponsibleName: "INSPECTION RESPONSIBLE NAME",
        inspectionResults: "INSPECTION RESULTS",
        reInspectionResults: "REINSPECTION RESULTS",
        material: "MATERIAL",
        amount: "AMOUNT",
        amountOfMaterial: "AMOUNT OF MATERIAL",
        additionalInformation: "ADDITIONAL INFORMATION 1",
        selectImage: "Select Image",
        dateOfTheBegining: "DATE & TIME OF BEGINNING",
        dateOfTheEnd: "DATE & TIME OF TERMINATING",
        customersOsNumber: "CUSTOMER'S OS NUMBER",
        codeOrOmFromTheCustomer: "CODE OR OM FROM THE CUSTOMER MAINTENANCE \nPLAN",
        requestedService: "REQUESTED SERVICE",
        generalObservations: "GENERAL OBSERVATIONS",
        team: "TEAM",


















        // *************************** Pr administrative ************************//
        overtimeSolicitorsName: "OVERTIME SOLICITOR'S NAME",
        applicationScheme: "APPLICATION SCHEME",
        whoIsYourLeader: "WHO IS YOUR LEADER",
        area_tag_local: "AREA-TAG-LOCAL",
        externalService: "EXTERNAL SERVICE",
        vehicle: "VEHICLE",
        returnToArea: "RETURN TO AREA",
        whichCard_documentLost: "WHICH CARD OR DOCUMENT LOST",
        urgencyReport: "URGENCY REPORT",
        additionalInformation: "ADDITIONAL INFORMATION 1",
        nameOfWhoAuthorized: "NAME OF WHO AUTHORIZED",
        item1RequestReason: "ITEM 1 REQUEST REASON",
        whereDoYouLive: "WHERE DO YOU LIVE",
        didYouPreviouslyWarned: "DID YOU PREVIOUSLY WARNED SOMEONE FROM THE COMPANY, WHO?",
        reasonOfTheAbsence: "REASON OF THE ABSENCE",
        howManyDaysOfAbscence: "HOW MANY DAYS OF ABSCENCE",
        askFor: "ASK FOR",
        reportThat: "REPORT THAT",
        requestThat: "REQUEST THAT",
        warningThat: "WARNING THAT",
        requiresThat: "REQUIRES THAT",
        overtimeReason: "OVERTIME REASON",
        kmReport: "KM REPORT",
        reportTheDates: "REPORT THE DATES THAT WILL BE \nSKIPED TO COMPENSATE",
        reportTheDatesCompensate: "REPORT THE DATES THAT WILL\nCOMPENSATE THE ALREADY SKIPPED DAYS",
        reportTheCID: "REPORT THE CID",
        discribeWhenMarkedAbove: "DISCRIBE WHEN MARKED ABOVE \nANOTHER ITEN /  NOT LISTED",

        // team: "TEAM",
        defectThatNeed: "DEFECT THAT NEED INTERVENTION",
        whichSafetyEquipment: "WHICH SAFETY EQUIPMENT IS NEEDED",
        amountOfSafetyEquipment: "WHICH SAFETY EQUIPMENT IS NEEDED",
        whichToolIsNeeded: "WHICH TOOL IS NEEDED",
        whichEquipmentIsNeeded: "WHICH EQUIPMENT IS NEEDED",
        howMuchIsNeeded: "HOW MUCH IS NEEDED",
        prRegistrationIsPosted: "Pre registration is posted",
        pleaseUpdatePr: "Please update pr",

        ///////////////////////////    //    user home//////////////////////////////////////////////////////////
        ///////////////////////////    //    user home//////////////////////////////////////////////////////////
        ///////////////////////////    //    user home//////////////////////////////////////////////////////////
        Report: "Report",
        CreateReport:"Create Report",
        ServiceTitle:"Service title",
        NameOfTheJobContract:"Name Of The Job/Contract",
        saveReport:"save report",
        thisJobServiceHaveNoPR:"This Job/Service have no pre-registration",
        thisJobServiceHaveNoReport:"This Job/Service have no report",
        starting:"Starting",
        sendmeacopyofmyreport:"Send me a copy of my report."
        









    }
}
else if (selectedLanguage === "pur") {
    strInReqLan = {
        learnMore: "Saber mais",
        helloWorld: 'Olá Mundo',
        userName: 'Nome de usuário',
        companyName: 'Nome da empresa',

        email: 'E-mail',
        companyEmail: 'E-mail da empresa',

        password: 'Senha',
        companyPassword: 'Senha da empresa',

        repeatePassword: 'Repetir senha',
        repeateCompanyPassword: 'Repetir a senha da empresa',

        joinApp: 'Inscrever-se',
        hvUalrAcc: 'Você já conta?',
        createNewAcc: 'Criar nova conta?',
        login: 'ENTRAR',
        unSubscribeForButton: 'Cancelar conta',
        textArea: 'Ajude-nos descrevendo a razão de cancelar sua conta.',


        forgetYourPassword: 'Esqueceu senha?',
        unSubscribe: 'Cancelar conta?',

        sendEmail: 'Enviar email',
        telephoneNumber: 'Número de telefone',
        companyTelephoneNumber: 'Número de tel da empresa',

        readTermsOfUse: "@–leia os termos de uso",
        company: "Empresa",
        companyForDatabase: "empresa",
        signUpAs: "Inscreva-se como",
        collaborator: "Colaborador",
        collaboratorForDatabase: "colaborador",
        errState: "Por favor, digite a razão para cancelar a inscrição",
        yourAccDeactivate: "Sua conta foi desativada",
        alreadyAccDeactivate: "Esta conta já desativada",
        backToTheLoginPage: "Voltar para a página de login",
        search: "Pesquisa",
        createNewJobs: "Empregos",


        createNewAdmServices: "Serviços administrativos",
        jobTitle: "Título de Obras / Contratos",
        status: "Status",
        address: "Endereço",
        begginingDate: "Data de início",
        contractNoOfJob: "Número do pedido de compras",
        responsibleName: "Nome responsável",
        responsibleNumber: "Número Responsável",
        expTermDate: "Data de término prevista",
        notStarted: "Não iniciado (ativo)",
        initiad: "Paralisada (ativo)",
        parallized: "Paralisada (ativo)",
        concluded: "Concluído (Inativo)",
        backToHomePage: "Voltar à página inicial",
        postJob: "Postar emprego",
        serTitle: "Inserir texto.",
        active: "Ativo",
        inActive: "Inativo",
        allFields: "Todos os campos são necessários",
        jobCreateSuc: "Trabalho criado com sucesso",
        feeds: "Feeds",
        view: "Ver postagem",
        postRequest: "Criar Obra / Contrato",
        submitPost: "Enviar e Salvar",
        type: "Tipo",
        update: "Atualizar",
        updatePost: "Atualizar post",
        postHasBeenDlt: "A postagem foi excluída",
        postHasBeenEdt: "Post foi editado",
        clear: "Claro",
        signature: "Assinatura",
        next: "Próximo",
        selectJob: "Selecione o trabalho",
        selectService: "Selecione o serviço",


        tapToDelete: "Toque para excluir a opção:",
        goBack: "Voltar",
        createOption: "Inserir texto",
        createOptionSave: "CRIAR OPÇÃO / SALVAR",
        editOption: "Inserir o Texto",
        optionCreated: "Opção criada",
        optionUpdated: "Opção atualizada",
        optionDeleted: "Opção excluída",
        preregistration: "Pré registro",
        selectpreregistration: "Selecione pré-inscrição",
        postPreRegistration: "Criando Obra / Contratos",
        serviceYouHaveDone: "SERVIÇO QUE VOCÊ FEZ",
        dateOfBeggingOfTheOccurrence: "DATA E HORÁRIO DE INÍCIO DA OCORRÊNCIA",
        dateOfEndOfTheOccurrence: "DATA E HORA DO FINAL DA OCORRÊNCIA",







        // *************************** Pr jobs ************************//
        jobService: "Emprego/Serviço",

        reportThat: "REPORT QUE",
        discipline: "DISCIPLINA",
        requestThat: "SOLICITE QUE",
        requester: "SOLICITANTE DO SERVIÇO",
        occurrence: "OCORRÊNCIA",
        area_tag_local: "ÁREA-TAG-LOCAL",
        specialEquipmentApplied: "EQUIPAMENTO ESPECIAL APLICADO",
        interventionType: "TIPO DE INTERVENÇÃO",
        climate: "CLIMA",
        DontApply: "Não aplique",
        thereWasADelay: "Houve um atraso",
        thereWasADelay: "HOUVE ATRASO",
        applicationScheme: "ESQUEMA DE APLICAÇÃO",
        delayedTime: "TEMPO DE ATRASO",
        scope: "ESCOPO",
        materialApplie: "MATERIAL APLICADO",
        materialAvailable: "MATERIAL DISPONÍVEL",
        timeSpent: "TEMPO GASTO",
        numberOfProfessionalsInvolved: "NÚMERO DE PROFISSIONAIS ENVOLVIDOS",
        reasonForDelay: "RAZÃO DE ATRASO",
        inspectionResponsibleName: "RESPONSÁVEL PELA INSPEÇÃO",
        inspectionResults: "RESULTADOS DE INSPEÇÃO",
        reInspectionResults: "RESULTADO DA REINSPEÇÃO",
        material: "MATERIAL",
        amount: "QUANT",
        amountOfMaterial: "QUANTIDADE DE MATERIAL",
        additionalInformation: "INFORMAÇÃO ADICIONAL 1",
        dateOfTheBegining: "DATA E HORA DE INICIALIZAÇÃO",
        dateOfTheEnd: "DATA E HORA DE FINALIZAÇÃO",
        customersOsNumber: "NÚMERO DA OS DO CILENTE",
        codeOrOmFromTheCustomer: "N° CÓDIGO, OM, PLANO DE MANUTENÇÃO",
        requestedService: "SERVIÇO QUE TE FOI SOLICITADO",
        generalObservations: "OBSERVAÇÕES GERAIS",






        // *************************** Pr administrative ************************//
        overtimeSolicitorsName: "NOME DO SOLICITOR DA HORA",
        applicationScheme: "FORMA DE ATENDIMENTO",
        whoIsYourLeader: "QUEM É O SEU LÍDER",
        area_tag_local: "ÁREA-TAG-LOCAL",
        externalService: "SERVIÇO EXTERNO",
        vehicle: "VEÍCULO",
        returnToArea: "RETORNAR À ÁREA",
        whichCard_documentLost: "QUAL CARTÃO OU DOCUMENTO PERDIDO",
        urgencyReport: "RELATÓRIO DE URGÊNCIA",
        additionalInformation: "INFORMAÇÃO ADICIONAL",
        selectImage: "SELECIONE AS IMAGENS",
        nameOfWhoAuthorized: "NOME DO WHO AUTORIZADO",
        item1RequestReason: "ITEM 1 SOLICITAR RAZÃO",
        whereDoYouLive: "ONDE VOCÊ MORA",
        didYouPreviouslyWarned: "VOCÊ ANTERIORMENTE advertiu ALGUÉM DO EMPRESA, QUEM?",
        reasonOfTheAbsence: "RAZÃO DA AUSÊNCIA",
        howManyDaysOfAbscence: "QUANTOS DIAS DE ABSCÊNCIA",
        askFor: "PEDIR POR:",
        reportThat: "INFORMANDO QUE",
        requestThat: "SOLICITE QUE",
        warningThat: "ATENÇÃO QUE:",
        requiresThat: "REQUER QUE",
        overtimeReason: "RAZÃO DE HORÁRIO",
        kmReport: "RELATÓRIO DE KM",
        reportTheDates: "RELATAR AS DATAS QUE SERÃO\nEXIBIDAS PARA COMPENSAR",
        reportTheDatesCompensate: "RELATAR AS DATAS QUE COMPENSARAM\nOS DIAS QUE JÁ PASSARAM",
        reportTheCID: "RELATAR O CID",
        discribeWhenMarkedAbove: "DISCRIBUA QUANDO MARCADO\nACIMA DE OUTRO ITEN / NÃO LISTADO",
        team: "EQUIPE",
        defectThatNeed: "DEFEITO QUE PRECISA DE INTERVENÇÃO",
        whichSafetyEquipment: "QUAL EQUIPAMENTO DE SEGURANÇA É NECESSÁRIO",
        // amountOfSafetyEquipment: "quantidade de equipamentos de segurança",
        whichToolIsNeeded: "QUAL FERRAMENTA É NECESSÁRIA",
        whichEquipmentIsNeeded: "QUAL EQUIPAMENTO É NECESSÁRIO",
        howMuchIsNeeded: "QUANTO É NECESSÁRIO",
        prRegistrationIsPosted: "Pré-inscrição é postada",
        pleaseUpdatePr: "Por favor, atualize",



        ///////////////////////////    //    user home//////////////////////////////////////////////////////////
        ///////////////////////////    //    user home//////////////////////////////////////////////////////////
        ///////////////////////////    //    user home//////////////////////////////////////////////////////////
        Report: "Relatório",
        CreateReport:"Criar relatório",
        NameOfTheJobContract:"Nome do trabalho / contrato",
        saveReport:"Salvar o relatorio",
        thisJobServiceHaveNoPR:"Este trabalho / serviço não tem pré-registro",
        thisJobServiceHaveNoReport:"Este trabalho / serviço não tem relatório",
        
        starting:"Iniciando",
        sendmeacopyofmyreport:"Send me a copy of my report."




        





































































    }
}

export default strInReqLan;