import React, { useRef, useEffect, useContext } from 'react';
import './ChosenCardForm.css';
import CardSection from './CardSection';
import AddonInputField from './AddonInputField';
import AddonInputAddonField from './AddonInputAddonField';
import { 
    Form,
    Row, 
    Col, 
    Tabs, 
    Tab, 
    OverlayTrigger, 
    Tooltip,
    InputGroup,
    Button 
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faClipboardCheck, 
    faUserCheck, 
    faDoorOpen, 
    faWeight, 
    faBalanceScale, 
    faRulerVertical,
    faHourglassStart,
    faSyringe,
    faStethoscope,
    faHeartbeat,
    faThermometerHalf 
} from '@fortawesome/free-solid-svg-icons';
import { 
    faCalendarAlt, 
    faIdBadge, 
    faClock,
    faCircle 
} from '@fortawesome/free-regular-svg-icons';
import cardFields from 'App/Utils/cardFields';
import Inputmask from 'inputmask';
import MainDoctorPanelDispatch from 'App/Utils/MainDoctorPanelDispatch';


function ChosenCardForm(props) {

    const mainDoctorPanelDispatch = useContext(MainDoctorPanelDispatch);

    const { data } = props;

    const controls = useRef(Object.assign( 
        ...cardFields.map( (item) => {
            if (item !== 'd1' && 
                item !== 'd3' &&
                item !== 'd4' &&
                item !== 'd46' &&
                item !== 'd64' &&
                item !== 'dcardid' &&
                item !== 'dpatientid' &&
                item !== 'dwdynamic' &&
                item !== 'dwdynamicdetails'
            ) { 
                return {[item]: React.createRef()};
            } else {
                return {};
            }
        } ) 
    ));

    const dcardFields = controls.current;
    const cardIDisValid = (data.cardID !== '' && data.cardID !== null && data.cardID !== 0);

    //mount datepiker
    useEffect(() => {
        if (cardIDisValid) {
            const d6 = dcardFields.d6.current;

            window.jQuery(d6).datepicker(
                {
                    format: "dd-mm-yyyy",
                    viewMode: "months",
                    minViewMode: "days",
                    language: 'ru'
                }
            );

            return () => {
                window.jQuery(d6).datepicker('destroy');
            };
        }
    },[dcardFields, cardIDisValid]);

    //mount inputmask
    //1
    useEffect(() => {
        if (cardIDisValid) {
            const maskSettings = {
                mask: "9{0,}",
                greedy: false
            };

            [
                'd9',
                'd12',
                'd15',
                'd16',
                'd17',
                'd18',
                'd19',
                'd21a',
                'd21b',
                'd22',
                'd36',
                'd37',
                'd38',
                'd39',
                'd41',
                'd42',
                'd43',
                'd47a',
                'd47b',
                'd48'
            ].forEach((item) => {
                Inputmask(maskSettings).mask(dcardFields[item].current);
            });

            return () => {
                [
                    'd9',
                    'd12',
                    'd15',
                    'd16',
                    'd17',
                    'd18',
                    'd19',
                    'd21a',
                    'd21b',
                    'd22',
                    'd36',
                    'd37',
                    'd38',
                    'd39',
                    'd41',
                    'd42',
                    'd43',
                    'd47a',
                    'd47b',
                    'd48'
                ].forEach((item) => {
                    Inputmask.remove(dcardFields[item].current);
                });
            };
        }
    }, [dcardFields, cardIDisValid]);
    //2
    useEffect(() => {
        if (cardIDisValid) {
            [
                'd2',
                'd20',
                'd45'
            ].forEach((item) => {
                Inputmask({
                    mask: "9{0,3}[.9{0,2}]",
                    greedy: false,
                    oncomplete: () => {
                        if (dcardFields[item].current.value.trim() === '.') {
                            dcardFields[item].current.value = '0.';
                        }
                    },
                    onincomplete: () => {
                        if (dcardFields[item].current.value.trim() === '.') {
                            dcardFields[item].current.value = '0.';
                        }
                    }
                }).mask(dcardFields[item].current);
            });

            return () => {
                [
                    'd2',
                    'd20',
                    'd45'
                ].forEach((item) => {
                    Inputmask.remove(dcardFields[item].current);
                });
            };
        }
    }, [dcardFields, cardIDisValid]);
    //3
    useEffect(() => {
        if (cardIDisValid) {
            const d54 = dcardFields.d54.current;

            const maskSettings = {
                mask: "9{0,2}[.9{0,1}]",
                greedy: false,
                oncomplete: () => {
                    if (d54.value.trim() === '.') {
                        d54.value = '0.';
                    }
                },
                onincomplete: () => {
                    if (d54.value.trim() === '.') {
                        d54.value = '0.';
                    }
                }
            };

            Inputmask(maskSettings).mask(d54);

            return () => {
                Inputmask.remove(d54);
            };
        }
    }, [dcardFields, cardIDisValid]);
    //4
    useEffect(() => {
        if (cardIDisValid) {
            [
                'd10',
                'd13',
                'd14',
                'd49',
                'd50',
                'd51',
                'd52',
                'd53',
                'd55',
                'd56',
                'd57'
            ].forEach((item) => {
                Inputmask({
                    mask: "9{0,5}[.9{0,2}]",
                    greedy: false,
                    oncomplete: () => {
                        if (dcardFields[item].current.value.trim() === '.') {
                            dcardFields[item].current.value = '0.';
                        }
                    },
                    onincomplete: () => {
                        if (dcardFields[item].current.value.trim() === '.') {
                            dcardFields[item].current.value = '0.';
                        }
                    }
                }).mask(dcardFields[item].current);
            });

            return () => {
                [
                    'd10',
                    'd13',
                    'd14',
                    'd49',
                    'd50',
                    'd51',
                    'd52',
                    'd53',
                    'd55',
                    'd56',
                    'd57'
                ].forEach((item) => {
                    Inputmask.remove(dcardFields[item].current);
                });
            };
        }
    }, [dcardFields, cardIDisValid]);

    const handleClick = () => {
        //console.log(dcardFields.d23.current.checked);

        const currentFields = Object.assign( 
            ...cardFields.map( (item) => {
                //NOT Constant
                if (item !== 'd1' && 
                    item !== 'd3' &&
                    item !== 'd4' &&
                    item !== 'd46' &&
                    item !== 'd64' &&
                    item !== 'dcardid' &&
                    item !== 'dpatientid' &&
                    item !== 'dwdynamic' &&
                    item !== 'dwdynamicdetails'
                ) { 
                    //NOT String type
                    if (item !== 'd5' &&
                        item !== 'd6' &&
                        item !== 'd28' &&
                        item !== 'd32' &&
                        item !== 'd35' &&
                        item !== 'd58' &&
                        item !== 'd63'
                    ) {
                        //NOT boolean type
                        if (item !== 'd23' &&
                            item !== 'd24' &&
                            item !== 'd26' &&
                            item !== 'd27' &&
                            item !== 'd44' &&
                            item !== 'd59' &&
                            item !== 'd61' &&
                            item !== 'd62'
                        ) {
                            return { 
                                [item]: (dcardFields[item].current.value === '' ? 
                                        '' : Number(dcardFields[item].current.value)) 
                            };                         
                        } else {
                            return { [item]: (dcardFields[item].current.checked ? 1 : 0) };
                        }                     
                    } else {    
                        return { [item]: dcardFields[item].current.value.replace(/\\/g, "/").replace(/"/g, '\\"').trim() };
                    }
                } else {
                    return {[item]: data.fields[item]};
                }
            } ) 
        );

        mainDoctorPanelDispatch({
            type: 'setUpdateChosenCardModal',
            updateChosenCardModalData: { 
                show: true,
                currentFields: currentFields 
            }
        }); 
    };

    if (cardIDisValid) {
        return (
        <React.Fragment>
            <h3>Карта процедуры:</h3>
            <br />
            <Row>
                <Col lg={4}>
                    <CardSection titleItems={["Дата:"]} contentItems={[
                        <AddonInputField 
                            addonText={<FontAwesomeIcon icon={faCalendarAlt} />} 
                            controlElement={
                                <Form.Control as="input" type="text" 
                                    ref={dcardFields.d6} defaultValue={data.fields.d6} />
                        } />
                    ]} />
                </Col>

                <Col lg={4}>
                    <CardSection titleItems={["Процедура:"]} contentItems={[
                        <Form.Control size="sm" as="select" 
                            ref={dcardFields.d0} defaultValue={data.fields.d0}>
                            <option value="1">ГД</option>
                            <option value="2">ГДФ</option>
                        </Form.Control>
                    ]} />
                </Col>

                <Col lg={4}>
                    <CardSection titleItems={["id карты:"]} contentItems={[
                        <AddonInputField 
                            addonText={<FontAwesomeIcon icon={faClipboardCheck} />} 
                            controlElement={
                                <Form.Control as="input" type="text" disabled 
                                    value={data.cardID} />
                        } />
                    ]} />
                </Col>
            </Row>
            <Row>
                <Col lg={5}>
                    <CardSection 
                        titleItems={["id пациента:", "Пациент:", "Зал:"]} 
                        contentItems={[
                            <AddonInputField 
                                addonText={<FontAwesomeIcon icon={faIdBadge} />} 
                                controlElement={
                                    <Form.Control as="input" type="text" disabled 
                                        value={data.fields.dpatientid} />
                            } />,
                            <AddonInputField 
                                addonText={<FontAwesomeIcon icon={faUserCheck} />} 
                                controlElement={
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="dcardPatientFIO">{data.fields.d1}</Tooltip>}>
                                        <Form.Control as="input" type="text" disabled 
                                            value={data.fields.d1} />
                                    </OverlayTrigger>
                            } />,
                            <AddonInputField 
                                addonText={<FontAwesomeIcon icon={faDoorOpen} />} 
                                controlElement={
                                    <Form.Control as="input" type="text" 
                                        ref={dcardFields.d5} defaultValue={data.fields.d5} />
                            } />
                    ]} />
                </Col>

                <Col lg={4}>
                    <CardSection 
                        titleItems={["Сухой вес:", "Динамика СВ:", "Рост:", "Возраст:"]} 
                        contentItems={[
                            <AddonInputAddonField 
                                preAddonText={<FontAwesomeIcon icon={faWeight} />}
                                postAddonText="кг"
                                controlElement={
                                    <Form.Control as="input" type="text" className="no-placeholder" 
                                        ref={dcardFields.d2} defaultValue={data.fields.d2} />
                            } />,
                            <AddonInputAddonField 
                                preAddonText={<FontAwesomeIcon icon={faBalanceScale} />}
                                postAddonText="кг"
                                controlElement={
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="dwDynamicDetails">{data.fields.dwdynamicdetails}</Tooltip>}>
                                        <Form.Control as="input" type="text" disabled 
                                            value={data.fields.dwdynamic} />
                                    </OverlayTrigger>
                            } />,
                            <AddonInputAddonField 
                                preAddonText={<FontAwesomeIcon icon={faRulerVertical} />}
                                postAddonText="см"
                                controlElement={
                                    <Form.Control as="input" type="text" disabled 
                                        value={data.fields.d3} />
                            } />,
                            <AddonInputField 
                                addonText={<FontAwesomeIcon icon={faClock} />} 
                                controlElement={
                                    <Form.Control as="input" type="text" disabled 
                                        value={data.fields.d4} />
                            } />
                    ]} />
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <Tabs defaultActiveKey="beforeGD" id="GD-stages">
                        <Tab eventKey="beforeGD" title="До ГД">
                            <hr />    
                            <Row>
                                <Col lg={4}>
                                    <CardSection
                                        titleItems={["Аппарат:", "Диализатор:", "Время ГД:"]}
                                        contentItems={[
                                            <Form.Control size="sm" as="select"
                                                ref={dcardFields.d7} defaultValue={data.fields.d7}>
                                                <option value="1">4008</option>
												<option value="2">5008</option>
                                            </Form.Control>,
                                            <Form.Control size="sm" as="select"
                                                ref={dcardFields.d8} defaultValue={data.fields.d8}>
                                                <option value="1">Fx 60</option>
												<option value="2">Fx 80</option>
												<option value="3">Fx 100</option>
                                            </Form.Control>,
                                            <AddonInputAddonField 
                                                preAddonText={<FontAwesomeIcon icon={faHourglassStart} />}
                                                postAddonText="мин"
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d9} defaultValue={data.fields.d9} />
                                            } />,
                                    ]} />
                                </Col>

                                <Col lg={4}>
                                    <CardSection
                                        titleItems={["Подача:", "Диализат:", "Поток ди-та/ф.поток:"]}
                                        contentItems={[
                                            <AddonInputAddonField 
                                                preAddonText={<FontAwesomeIcon icon={faSyringe} />}
                                                postAddonText="мл/ч"
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d10} defaultValue={data.fields.d10} />
                                            } />,
                                            <Form.Control size="sm" as="select"
                                                ref={dcardFields.d11} defaultValue={data.fields.d11}>
                                                <option value="1">ст</option>
												<option value="2">гл</option>
												<option value="3">са</option>
                                            </Form.Control>,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d12} defaultValue={data.fields.d12} />
                                            } />
                                    ]} />
                                </Col>

                                <Col lg={4}>
                                    <CardSection
                                        titleItems={["Доза гепарина:", "Болюс:", "Вр. гепарин./оконч:"]}
                                        contentItems={[
                                            <AddonInputAddonField 
                                                preAddonText={<FontAwesomeIcon icon={faSyringe} />}
                                                postAddonText="ЕД"
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d13} defaultValue={data.fields.d13} />
                                            } />,
                                            <AddonInputAddonField 
                                                preAddonText={<FontAwesomeIcon icon={faSyringe} />}
                                                postAddonText="мл"
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d14} defaultValue={data.fields.d14} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d15} defaultValue={data.fields.d15} />
                                            } />
                                    ]} />
                                </Col>

                                <Col lg={4}>
                                    <CardSection
                                        titleItems={["Бикарбонат:", "Na+:", "V-уф:", "Ск.К.:"]}
                                        contentItems={[
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d16} defaultValue={data.fields.d16} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d17} defaultValue={data.fields.d17} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d18} defaultValue={data.fields.d18} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d19} defaultValue={data.fields.d19} />
                                            } />
                                    ]} />
                                </Col>

                                <Col lg={4}>
                                    <CardSection
                                        titleItems={[null, "Вес:", "МДП:", "АД:", "Пульс:"]}
                                        contentItems={[
                                            <Form.Control as="input" size="sm" type="text" disabled value="До ГД" />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faWeight} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d20} defaultValue={data.fields.d20} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faCircle} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" disabled
                                                        value={data.fields.d64} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faStethoscope} />} 
                                                controlElement={
                                                    <React.Fragment>
                                                        <Form.Control as="input" type="text" className="no-placeholder"
                                                            ref={dcardFields.d21a} defaultValue={data.fields.d21a} />
                                                        <div className="input-group-prepend input-group-append">
                                                            <InputGroup.Text>/</InputGroup.Text>
                                                        </div>                                                  
                                                        <Form.Control as="input" type="text" className="no-placeholder"
                                                            ref={dcardFields.d21b} defaultValue={data.fields.d21b} />
                                                    </React.Fragment>
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faHeartbeat} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d22} defaultValue={data.fields.d22} />
                                            } />
                                    ]} />
                                </Col>

                                <Col lg={12}></Col>

                                <Col lg={8}>
                                    <CardSection
                                        titleItems={[
                                            null, 
                                            "Состояние:", 
                                            null, 
                                            null, 
                                            null,
                                            null,
                                            "Тоны сердца:",
                                            "Живот:",
                                            null,
                                            null,
                                            null
                                        ]}
                                        contentItems={[ 
                                            <Form.Control as="input" size="sm" type="text" disabled value="До ГД" />,
                                            <Form.Control size="sm" as="select"
                                                ref={dcardFields.d25} defaultValue={data.fields.d25}>
                                                <option value="1">удовлетворительное</option>
												<option value="2">относительно удовлетворительное</option>
												<option value="3">средней тяжести</option>
												<option value="4">тяжелое</option>
                                            </Form.Control>,
                                            <React.Fragment>
                                                <Form.Check inline label="Жалобы" type="checkbox"
                                                    ref={dcardFields.d23} defaultChecked={data.fields.d23 !== 0} />
                                                <Form.Check inline label="Оттеки" type="checkbox"
                                                    ref={dcardFields.d24} defaultChecked={data.fields.d24 !== 0} />
                                            </React.Fragment>,
                                            <Form.Control as="input" size="sm" type="text" disabled value="Органы дыхания:" />,
                                            <React.Fragment>
                                                <Form.Check inline label="Изменения" type="checkbox"
                                                    ref={dcardFields.d26} defaultChecked={data.fields.d26 !== 0} />
                                                <Form.Check inline label="Хрипы" type="checkbox"
                                                    ref={dcardFields.d27} defaultChecked={data.fields.d27 !== 0} />
                                            </React.Fragment>,
                                            <Form.Control as="input" size="sm" type="text" placeholder="локализация"
                                                ref={dcardFields.d28} defaultValue={data.fields.d28} />,
                                            <Form.Control size="sm" as="select"
                                                ref={dcardFields.d29} defaultValue={data.fields.d29}>
                                                <option value="1">ритмичные</option>
												<option value="2">аритмичные</option>
                                            </Form.Control>,                          
                                            <Row>
                                                <Col sm={6} className="sav2-stomach-select">
                                                    <Form.Control size="sm" as="select"
                                                        ref={dcardFields.d30} defaultValue={data.fields.d30}>
                                                        <option value="1">мягкий</option>
												        <option value="2">твердый</option>
                                                    </Form.Control>
                                                </Col>
                                                <Col sm={6} className="sav2-stomach-select">
                                                    <Form.Control size="sm" as="select"
                                                        ref={dcardFields.d31} defaultValue={data.fields.d31}>
                                                        <option value="1">безболезненный</option>
												        <option value="2">болезненный</option>
                                                    </Form.Control>
                                                </Col>
                                            </Row>,
                                            <Form.Control as="input" size="sm" type="text" placeholder="локализация"
                                                ref={dcardFields.d32} defaultValue={data.fields.d32} />,
                                            <Row>
                                                <Col sm={6}>
                                                    <Row>
                                                        <Form.Label className="sav2-lb-sm" column sm="auto" md="auto" lg="auto">
                                                            Область AVF:
                                                        </Form.Label>
                                                        <Col>
                                                            <Form.Control size="sm" as="select"
                                                                ref={dcardFields.d33} defaultValue={data.fields.d33}>
                                                                <option value="1">без воспалений</option>
                                                                <option value="2">воспалена</option>
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={6}>
                                                    <Row>
                                                        <Form.Label className="sav2-lb-sm" column sm="auto" md="auto" lg="auto">
                                                            Шум AVF:
                                                        </Form.Label>
                                                        <Col>
                                                            <Form.Control size="sm" as="select"
                                                                ref={dcardFields.d34} defaultValue={data.fields.d34}>
                                                                <option value="1">удовлетворительное</option>
                                                                <option value="2">ослабленное</option>
                                                                <option value="3">не выслушивается</option>
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>,
                                            <Form.Control as="input" size="sm" type="text" placeholder="доп. информация"
                                                ref={dcardFields.d35} defaultValue={data.fields.d35} />
                                    ]} />
                                </Col>

                                <Col lg={12}></Col>

                                <Col lg={4}>
                                    <CardSection
                                        titleItems={[null, null, null, null, null, null, null]}
                                        contentItems={[
                                            <Form.Control as="input" size="sm" type="text" disabled value="Назначения:" />,
                                            <AddonInputAddonField 
                                                preAddonText={<span>Эпоэтин &alpha;</span>}
                                                postAddonText="ME"
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d36} defaultValue={data.fields.d36} />
                                            } />,
                                            <AddonInputAddonField 
                                                preAddonText={<span>Эпоэтин &beta;</span>}
                                                postAddonText="ME"
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d37} defaultValue={data.fields.d37} />
                                            } />,
                                            <AddonInputAddonField 
                                                preAddonText="Аранесп"
                                                postAddonText="мкг"
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d38} defaultValue={data.fields.d38} />
                                            } />,
                                            <AddonInputAddonField 
                                                preAddonText="Мирцера"
                                                postAddonText="мкг"
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d39} defaultValue={data.fields.d39} />
                                            } />,
                                            <Form.Label className="sav2-lb-sm">
                                                Способ введения в конце ГД:
                                            </Form.Label>,
                                            <Form.Control size="sm" as="select"
                                                ref={dcardFields.d40} defaultValue={data.fields.d40}>
                                                <option value="1">подкожно</option>
												<option value="2">внутривенно</option>
                                            </Form.Control>
                                    ]} />
                                </Col>

                                <Col lg={4}>
                                    <CardSection
                                        titleItems={[null, null, null, null, null, null, null]}
                                        contentItems={[
                                            <Form.Control as="input" size="sm" type="text" disabled value="Назначения:" />,
                                            <Form.Label className="sav2-lb-sm">
                                                в/в за 40 мин до окончания ГД дробно медленно:
                                            </Form.Label>,
                                            <AddonInputAddonField 
                                                preAddonText="Железа декстран"
                                                postAddonText="мг"
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d41} defaultValue={data.fields.d41} />
                                            } />,
                                            <AddonInputAddonField 
                                                preAddonText="Железа сахарат"
                                                postAddonText="мг"
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d42} defaultValue={data.fields.d42} />
                                            } />,
                                            <Form.Label className="sav2-lb-sm">
                                                в/в в конце ГД:
                                            </Form.Label>,
                                            <AddonInputAddonField 
                                                preAddonText="Витамин-C"
                                                postAddonText="мг"
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d43} defaultValue={data.fields.d43} />
                                            } />,
                                            <Form.Check inline label="Витамин-B  500 мкг" type="checkbox"
                                                ref={dcardFields.d44} defaultChecked={data.fields.d44 !== 0} />
                                    ]} />
                                </Col>
                            </Row>
                        </Tab>

                        <Tab eventKey="afterGD" title="После ГД">
                            <hr />
                            <Row>
                                <Col lg={4}>
                                    <CardSection
                                        titleItems={[null, "Вес:", "Удалено:", "АД:", "Пульс:"]}
                                        contentItems={[
                                            <Form.Control as="input" size="sm" type="text" disabled value="После ГД" />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faWeight} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d45} defaultValue={data.fields.d45} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faBalanceScale} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" disabled
                                                        value={data.fields.d46} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faStethoscope} />} 
                                                controlElement={
                                                    <React.Fragment>
                                                        <Form.Control as="input" type="text" className="no-placeholder"
                                                            ref={dcardFields.d47a} defaultValue={data.fields.d47a} />
                                                        <div className="input-group-prepend input-group-append">
                                                            <InputGroup.Text>/</InputGroup.Text>
                                                        </div>                                                  
                                                        <Form.Control as="input" type="text" className="no-placeholder"
                                                            ref={dcardFields.d47b} defaultValue={data.fields.d47b} />
                                                    </React.Fragment>
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faHeartbeat} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d48} defaultValue={data.fields.d48} />
                                            } />
                                    ]} />
                                </Col>

                                <Col lg={4}>
                                    <CardSection
                                        titleItems={["KT/V:", "V перф. крови:", "V замещения:"]}
                                        contentItems={[
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d49} defaultValue={data.fields.d49} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d50} defaultValue={data.fields.d50} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d51} defaultValue={data.fields.d51} />
                                            } />
                                    ]} />
                                </Col>

                                <Col lg={4}>
                                    <CardSection
                                        titleItems={["Глюкоза до ГД:", "Глюкоза после ГД:", "Температура тела:"]}
                                        contentItems={[
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d52} defaultValue={data.fields.d52} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d53} defaultValue={data.fields.d53} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faThermometerHalf} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d54} defaultValue={data.fields.d54} />
                                            } />
                                    ]} />
                                </Col>

                                <Col lg={12}></Col>

                                <Col lg={8}>
                                    <CardSection
                                        titleItems={[null, "Состояние:", null, null, null, null]}
                                        contentItems={[
                                            <Form.Control as="input" size="sm" type="text" disabled value="После ГД" />,
                                            <Form.Control size="sm" as="select"
                                                ref={dcardFields.d60} defaultValue={data.fields.d60}>
                                                <option value="1">удовлетворительное</option>
												<option value="2">относительно удовлетворительное</option>
												<option value="3">средней тяжести</option>
												<option value="4">тяжелое</option>
                                            </Form.Control>,
                                            <Form.Check inline label="Жалобы" type="checkbox"
                                                ref={dcardFields.d59} defaultChecked={data.fields.d59 !== 0} />,
                                            <Form.Check inline label="Течение ГД осложнения" type="checkbox"
                                                ref={dcardFields.d61} defaultChecked={data.fields.d61 !== 0} />,
                                            <Form.Check inline label="Требуется изменение терапии и диализной программы" type="checkbox"
                                                ref={dcardFields.d62} defaultChecked={data.fields.d62 !== 0} />,
                                            <Form.Control as="input" size="sm" type="text" placeholder="доп. информация"
                                                ref={dcardFields.d63} defaultValue={data.fields.d63} />
                                    ]} />
                                </Col>

                                <Col lg={4}>
                                    <CardSection
                                        titleItems={[null, "Ca++:", "K+:", "Na+:", null]}
                                        contentItems={[
                                            <Form.Control as="input" size="sm" type="text" disabled value="Электролиты" />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d55} defaultValue={data.fields.d55} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d56} defaultValue={data.fields.d56} />
                                            } />,
                                            <AddonInputField 
                                                addonText={<FontAwesomeIcon icon={faSyringe} />} 
                                                controlElement={
                                                    <Form.Control as="input" type="text" className="no-placeholder"
                                                        ref={dcardFields.d57} defaultValue={data.fields.d57} />
                                            } />,
                                            <AddonInputField 
                                                addonText="ЭКГ:" 
                                                controlElement={
                                                    <Form.Control as="input" type="text"
                                                        ref={dcardFields.d58} defaultValue={data.fields.d58} />
                                            } />,
                                    ]} />
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Row>
                <Col lg={12}>
                    <hr />
                </Col>
                <Col lg={12}>
                    <Button variant="primary" size="lg" block onClick={handleClick}>Записать</Button>
                </Col>
            </Row>
        </React.Fragment>
        );
    } else {
        return (
            <Row className="justify-content-lg-center">
                <Col lg="auto">
                    Карта не выбрана.
                    Для начала работы с картой необходимо её выбрать 
                    из <b>Картотеки</b> (кнопка <i>"Работа с картой"</i>)
                </Col>
            </Row>
        );
    }
}

export default ChosenCardForm;
