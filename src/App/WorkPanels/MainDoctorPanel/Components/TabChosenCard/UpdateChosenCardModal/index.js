import React, { useContext } from 'react';
import './UpdateChosenCardModal.css';
import { Modal, Button } from 'react-bootstrap';
import cardFields from 'App/Utils/cardFields';
import fetchData from 'App/Utils/fetchData';
import processException from 'App/Utils/processException';
import makeFixedFormat from 'App/Utils/makeFixedFormat';
import { AppDispatch } from 'App/Utils/useAppReducer';
import { MainDoctorPanelDispatch } from 'App/Utils/useMainDoctorPanelReducer';


function UpdateChosenCardModal(props) {

    const appDispatch = useContext(AppDispatch);
    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const {
        cardID, 
        data,
        prevFields,
        userData
    } = props;

    const loadingTriggers = [
        () => { appDispatch({ type: 'setIsLoad', isLoad: true }); },
        () => { appDispatch({ type: 'setIsLoad', isLoad: false }); }
    ];

    const handleClose = () => {
        mainDoctorPanelDispatch({
            type: 'setUpdateChosenCardModal',
            updateChosenCardModalData: { show: false }
        });
    };

    const anyFieldChanged = () => {
        let changed = false;

        cardFields.forEach((item) => {
            if (prevFields[item] !== data.currentFields[item]) {
                changed = true;;
            } 
        });

        return changed;
    };

    const handleSave = async () => {
        if (anyFieldChanged()) {
            const currentdate = new Date();
            const datetime = "modification timestamp: "
                + makeFixedFormat(currentdate.getDate()) + "-"
                + makeFixedFormat((currentdate.getMonth() + 1)) + "-"
                + currentdate.getFullYear() + " @ "
                + makeFixedFormat(currentdate.getHours()) + ":"
                + makeFixedFormat(currentdate.getMinutes()) + ":"
                + makeFixedFormat(currentdate.getSeconds());

            const changelogVal = '|' + datetime + ' by ' + userData.userFIO + ' (id:' + userData.userID + ')';
        
            const fields = {
                d_procedure_id 			: data.currentFields.d0.toString(),
                dry_weight 				: data.currentFields.d2.toString(),
                room 					: data.currentFields.d5.toString(),
                date 					: data.currentFields.d6.toString(),
                device_id 				: data.currentFields.d7.toString(),
                dialyzer_id 			: data.currentFields.d8.toString(),
                gd_period_minutes 		: data.currentFields.d9.toString(),
                inject_speed 			: data.currentFields.d10.toString(),
                dialysate_id 			: data.currentFields.d11.toString(),
                stream_dita 			: data.currentFields.d12.toString(),
                heparin_dose 			: data.currentFields.d13.toString(),
                bolus 					: data.currentFields.d14.toString(),
                vr_heparin_complete 	: data.currentFields.d15.toString(),
                bicarbonate 			: data.currentFields.d16.toString(),
                na 						: data.currentFields.d17.toString(),
                v_uf 					: data.currentFields.d18.toString(),
                sk_k 					: data.currentFields.d19.toString(),
                pre_weight 				: data.currentFields.d20.toString(),
                pre_ap_up 				: data.currentFields.d21a.toString(),
                pre_ap_low 				: data.currentFields.d21b.toString(),
                pre_pulse 				: data.currentFields.d22.toString(),
                pre_complaint 			: data.currentFields.d23.toString(),
                pre_edema 				: data.currentFields.d24.toString(),
                pre_state_id 			: data.currentFields.d25.toString(),
                pre_breath_changes 		: data.currentFields.d26.toString(),
                pre_wheeze 				: data.currentFields.d27.toString(),
                pre_wheeze_local 		: data.currentFields.d28.toString(),
                pre_heart_rhythm_id 	: data.currentFields.d29.toString(),
                pre_stomach_soft_id 	: data.currentFields.d30.toString(),
                pre_stomach_pain_id 	: data.currentFields.d31.toString(),
                pre_stomach_pain_local 	: data.currentFields.d32.toString(),
                pre_area_avf_id 		: data.currentFields.d33.toString(),
                pre_noise_avf_id 		: data.currentFields.d34.toString(),
                pre_additions 			: data.currentFields.d35.toString(),
                epoetin_alfa 			: data.currentFields.d36.toString(),
                epoetin_beta 			: data.currentFields.d37.toString(),
                aranesp 				: data.currentFields.d38.toString(),
                mircera 				: data.currentFields.d39.toString(),
                post_injection_id 		: data.currentFields.d40.toString(),
                ferrum_dextran 			: data.currentFields.d41.toString(),
                ferrum_sacch 			: data.currentFields.d42.toString(),
                vit_c 					: data.currentFields.d43.toString(),
                vit_b 					: data.currentFields.d44.toString(),
                post_weight 			: data.currentFields.d45.toString(),
                post_ap_up 				: data.currentFields.d47a.toString(),
                post_ap_low 			: data.currentFields.d47b.toString(),
                post_pulse 				: data.currentFields.d48.toString(),
                ktv 					: data.currentFields.d49.toString(),
                v_perf_blood 			: data.currentFields.d50.toString(),
                v_replacement 			: data.currentFields.d51.toString(),
                pre_glucose 			: data.currentFields.d52.toString(),
                post_glucose 			: data.currentFields.d53.toString(),
                body_temp 				: data.currentFields.d54.toString(),
                electrolyte_ca 			: data.currentFields.d55.toString(),
                electrolyte_k 			: data.currentFields.d56.toString(),
                electrolyte_na			: data.currentFields.d57.toString(),
                ekg 					: data.currentFields.d58.toString(),
                post_complaint 			: data.currentFields.d59.toString(),
                post_state_id 			: data.currentFields.d60.toString(),
                post_gd_difficulties 	: data.currentFields.d61.toString(),
                post_change_required 	: data.currentFields.d62.toString(),
                post_additions 			: data.currentFields.d63.toString(),
                id 						: cardID,
                changelog  				: changelogVal
            };

            const textResponse = await fetchData(
                'update_dcard',
                fields,
                ...loadingTriggers
            );            

            await mainDoctorPanelDispatch({
                type: 'setUpdateChosenCardModal',
                updateChosenCardModalData: { show: false }
            });

            const response = {
                message: textResponse,
                methodName: 'UpdateChosenCardModal.handleSave()',
                representError: (errorInfo) => {
                    mainDoctorPanelDispatch({
                        type: 'setInfoBox',
                        infoBoxData: { variant: 'danger', text: errorInfo, show: true }
                    });
                }
            };

            if (!processException(response)) {
                await mainDoctorPanelDispatch({
                    type: 'setChosenCardData',
                    chosenCardData: { 
                        fields: data.currentFields
                    }
                });
                
                mainDoctorPanelDispatch({
                    type: 'setInfoBox',
                    infoBoxData: { variant: 'info', text: textResponse, show: true }
                });
            }
        }
    };

    const message = (anyFieldChanged() ? 
        'Произвести запись изменений по карте под номером id: '+ cardID +' ?' : 
        'Запись данных невозможна. Ни одно из полей не было изменено');

    return (
        <Modal show={data.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Запись данных:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" disabled={!anyFieldChanged()} onClick={handleSave}>Записать</Button>
                <Button variant="secondary" onClick={handleClose}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateChosenCardModal;
