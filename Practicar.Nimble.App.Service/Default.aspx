<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Practicar.Nimble.App.Service.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.1.min.js"></script>
    <script src="aes.js"></script>
    <script>


        var password = 'practicar2010';
        var plaintext = 'Denis Renam';
        // var ciphertext = Aes.Ctr.encrypt(plaintext, password, 256);


        var text = plaintext;
        var Key = CryptoJS.enc.Utf8.parse("8080808080808080");
        var IV = CryptoJS.enc.Utf8.parse("8080808080808080");
        var encryptedText = CryptoJS.AES.encrypt(text, Key, { iv: IV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        var decrypted = CryptoJS.AES.decrypt(
                                              encryptedText,
                                              Key,
                                              {
                                                  iv: IV,
                                                  mode: CryptoJS.mode.CBC,
                                                  padding: CryptoJS.pad.Pkcs7
                                              }
                                            );




      //  alert(decrypted.toString(CryptoJS.enc.Utf8));

        var final = {"_oAuth":{
            "SecurityToken":null,
            "Promise":null,
            "DomainURL":"https://practicarcloud.sharepoint.com",
            "ProjectURL":"https://practicarcloud.sharepoint.com/sites/PWA",
            "User":{
                "Login":"byhlB9zJUl6iA7TmWRDUmoDXyjm618KjywtrXwgQRSc=",
                "Password":"hniVnjfeGEA4zRkRhnK9Sw==",
                "Profile":{
                    "__metadata":{
                        "id":"https://practicarcloud.sharepoint.com/sites/pwa/_api/Web/GetUserById(66)",
                        "uri":"https://practicarcloud.sharepoint.com/sites/pwa/_api/Web/GetUserById(66)",
                        "type":"SP.User"}
                    ,
                    "Groups":  {"__deferred":{"uri":"https://practicarcloud.sharepoint.com/sites/pwa/_api/Web/GetUserById(66)/Groups"}},
                    "Id":66,
                    "IsHiddenInUI":false,
                    "LoginName":"i:0#.f|membership|dursulino@practicar.com.br",
                    "Title":"Denis Ursulino",
                    "PrincipalType":1,
                    "Email":"dursulino@practicar.com.br",
                    "IsShareByEmailGuestUser":false,
                    "IsSiteAdmin":true,
                    "UserId":{"__metadata":{"type":"SP.UserIdInfo"},"NameId":"1003000085195d4a","NameIdIssuer":"urn:federation:microsoftonline"},
                    "Photo":"https://practicarcloud.sharepoint.com/sites/PWA/_layouts/15/userphoto.aspx?size=S&accountname=dursulino@practicar.com.br",
                    "ResourceId":"1104bbeb-dace-e311-b8fc-00155d6c2709"}},
            "IsAuthenticate":true,"Message":"Sucesso"},
            "_value":{
                    "__metadata":{"id":"https://practicarcloud.sharepoint.com/sites/PWA/_api/ProjectData/%5Ben-US%5D/Assignments(AssignmentId=guid'67ae6758-e8e6-e411-8284-ec0ec4f80702',ProjectId=guid'd152968e-d3e5-e411-80c8-00155dbc7502')",
                    "uri":"https://practicarcloud.sharepoint.com/sites/PWA/_api/ProjectData/%5Ben-US%5D/Assignments(AssignmentId=guid'67ae6758-e8e6-e411-8284-ec0ec4f80702',ProjectId=guid'd152968e-d3e5-e411-80c8-00155dbc7502')",
                    "type":"ReportingData.Assignment"},
                    "Baseline":{
                        "__deferred":{"uri":"https://practicarcloud.sharepoint.com/sites/PWA/_api/ProjectData/%5Ben-US%5D/Assignments(AssignmentId=guid'67ae6758-e8e6-e411-8284-ec0ec4f80702',ProjectId=guid'd152968e-d3e5-e411-80c8-00155dbc7502')/Baseline"}},
                    "Project":{"__deferred":{"uri":"https://practicarcloud.sharepoint.com/sites/PWA/_api/ProjectData/%5Ben-US%5D/Assignments(AssignmentId=guid'67ae6758-e8e6-e411-8284-ec0ec4f80702',ProjectId=guid'd152968e-d3e5-e411-80c8-00155dbc7502')/Project"}},
                    "Resource":{"__deferred":{"uri":"https://practicarcloud.sharepoint.com/sites/PWA/_api/ProjectData/%5Ben-US%5D/Assignments(AssignmentId=guid'67ae6758-e8e6-e411-8284-ec0ec4f80702',ProjectId=guid'd152968e-d3e5-e411-80c8-00155dbc7502')/Resource"}},
                    "Task":{"__deferred":{"uri":"https://practicarcloud.sharepoint.com/sites/PWA/_api/ProjectData/%5Ben-US%5D/Assignments(AssignmentId=guid'67ae6758-e8e6-e411-8284-ec0ec4f80702',ProjectId=guid'd152968e-d3e5-e411-80c8-00155dbc7502')/Task"}},
                    "TimephasedData":{"__deferred":{"uri":"https://practicarcloud.sharepoint.com/sites/PWA/_api/ProjectData/%5Ben-US%5D/Assignments(AssignmentId=guid'67ae6758-e8e6-e411-8284-ec0ec4f80702',ProjectId=guid'd152968e-d3e5-e411-80c8-00155dbc7502')/TimephasedData"}},
                    "ProjectId":"d152968e-d3e5-e411-80c8-00155dbc7502","AssignmentId":"67ae6758-e8e6-e411-8284-ec0ec4f80702","AssignmentActualCost":"21.000000","AssignmentActualFinishDate":null,"AssignmentActualOvertimeCost":"0.000000","AssignmentActualOvertimeWork":"0.000000","AssignmentActualRegularCost":"21.000000","AssignmentActualRegularWork":"20.000000","AssignmentActualStartDate":"/Date(1432544400000)/","AssignmentActualWork":"20.000000","AssignmentACWP":"21.000000","AssignmentBCWP":"21.000000","AssignmentBCWS":"41.000000","AssignmentBookingDescription":"Tipo de reserva (fixa) comprometida","AssignmentBookingId":0,"AssignmentBookingName":"Confirmados","AssignmentBudgetCost":"0.000000"
                     ,"AssignmentBudgetMaterialWork":"0.000000","AssignmentBudgetWork":"0.000000","AssignmentCost":"41.000000","AssignmentCostVariance":"0.000000","AssignmentCreatedDate":"/Date(1429459491310)/","AssignmentCreatedRevisionCounter":2,"AssignmentCV":"0.000000","AssignmentDelay":"0.000000","AssignmentFinishDate":"/Date(1432922400000)/","AssignmentFinishVariance":"0.000000","AssignmentIsOverallocated":false,"AssignmentIsPublished":true,"AssignmentMaterialActualWork":"0.000000","AssignmentMaterialWork":"0.000000","AssignmentModifiedDate":"/Date(1443982544540)/"
                    ,"AssignmentModifiedRevisionCounter":92,"AssignmentOvertimeCost":"0.000000","AssignmentOvertimeWork":"0.000000","AssignmentPeakUnits":"100.000000","AssignmentPercentWorkCompleted":50,"AssignmentRegularCost":"41.000000","AssignmentRegularWork":"40.000000","AssignmentRemainingCost":"20.000000","AssignmentRemainingOvertimeCost":"0.000000","AssignmentRemainingOvertimeWork":"0.000000","AssignmentRemainingRegularCost":"20.000000","AssignmentRemainingRegularWork":"20.000000","AssignmentRemainingWork":"20.000000","AssignmentResourcePlanWork":"0.000000","AssignmentResourceType":2,"AssignmentStartDate":"/Date(1432544400000)/","AssignmentStartVariance":"0.000000","AssignmentSV":"-20.000000","AssignmentType":0,"AssignmentVAC":"0.000000","AssignmentWork":"40.000000","AssignmentWorkVariance":"0.000000","IsPublic":true,"ProjectName":"Nimble 3 - Transforme seus projetos","ResourceId":"1104bbeb-dace-e311-b8fc-00155d6c2709","ResourceName":"Denis Ursulino","TaskId":"66ae6758-e8e6-e411-8284-ec0ec4f80702","TaskIsActive":true
                    ,"TaskName":"Configurar fluxos","TimesheetClassId":"000047df-f395-462a-a1f2-7011fef3a122","TypeDescription":"Tipo de atribuição que indica uma atribuição normal tem um recurso atribuído. Esse tipo de atribuição é copiado do Banco de Dados Publicado.","TypeName":"Atribuição normal","Integridade_T":null,"EDR_L":"Líder técnico","StatusdoSinalizador_T":null,"DepartamentosdoRecurso_L":null,"TipodeCusto_L":null,"NomedaEquipe_L":null,"PMOplanejado_T":null,"PMOSPI_T":null,"PMOCPI_T":null,"PMOCapexPlanejado_T":null,"PMOCapexRealizado_T":null,"PMODesviosCapex_T":null,"PMOPontosCríticosTarefa_T":null,"PMOPlanodeAção_T":null,"PMODataAlvo_T":null,"PMOResponsávelPlanodeAção_T":null,"PMORisco_T":null,"PMODataProjetada_T":null,"PMOCustoProjetado_T":null,"PMOCapexProjetado_T":null,"PMOIdentificador_T":null,"PMOImpacto_T":null,"PMOTarefaChave_T":null,"PMOCustoLinhadeBase_T":null,"PMOInícioLinhadeBaseTarefa_T":null,"PMOTérminoLinhadeBaseTarefa_T":null,"PMODuraçãoLinhadeBase_T":null,"PMOTrabalhoLinhadeBase_T":null,"Feriado_T":null
                    ,"PMODataLimiteTarefa_T":null,"PMOTaskName_T":null,"PMOSavingPlanejado_T":null,"PMOSavingRealizado_T":null}};
        $.ajax({

            method: 'POST',
            url: 'http://localhost:15269/AssignmentService.svc/Update/10',
            async: false,
            data: JSON.stringify(final),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                alert(data);
            },
            error: function (result, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });

    </script>

</head>
<body>
    <form id="form1" runat="server">
        <div>
        </div>
    </form>
</body>
</html>
