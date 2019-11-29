import React, { Component, Fragment } from 'react'
import { Accordion, Icon, List } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { getKonten } from "../../../actions/konten";

const item1 = (
    <List.Item key="1">"COMS.-MSCI WORL.T.U.ETFI"</List.Item>
)
const item2 = (
    <List.Item key="2">"IS EUR.PROP.YI.U.ETF EOD"</List.Item>
)
const item3 = (
    <List.Item key="3">"ISHS Aktienfond"</List.Item>
)
const item4 = (
    <List.Item key="4">"LY.MSCI"</List.Item>
)
const my_items = [item1, item2, item3, item4];
const ek10_children = (
    <List>
        {my_items}
    </List>
)
const kt10_panels = [
    { key: 'panel-1ab', title: 'Aktienfond', content: { content: ek10_children } },
]

const kt10_content = (
    <List>
        <List.Item>Aktie</List.Item>
        <List.Item><Accordion.Accordion panels={kt10_panels} /></List.Item>
        <List.Item>Bond</List.Item>
    </List>
)

const kt8_panels = [
    { key: 'panel-1ab', title: 'Aktienfond', content: { content: kt10_content } },
]

const kt8_content = (
    <List>
        <List.Item><Accordion.Accordion panels={kt8_panels} /></List.Item>
    </List>
)

const kt7_panels = [
    { key: 'panel-1ab', title: 'Geldanlage', content: { content: kt8_content } },
]

const kt1_content = (
    <List>
        <List.Item>Barvermögen</List.Item>
        <List.Item><Accordion.Accordion panels={kt7_panels} /></List.Item>
        <List.Item>Mietkaution</List.Item>
    </List>
)

const level1Panels = [
    { key: 'panel-1a', title: 'Aktiva', content: { content: kt1_content } },
    { key: 'panel-ba', title: 'Fremdkapital', content: 'Level 1B Contents' },
]

function rootPanels(konten) {
    const max_depth = Math.max.apply(Math,konten.map(function(o){return o.ebene;}))
    let content_dict = {};
    const konten_ebene = konten.filter(x => x.ebene === 3);
    konten_ebene.forEach(elternkonto =>{
        const kinder_konten = konten.filter(x => x.elternkonto === elternkonto.id)
        console.log('Parent:', elternkonto.name)
        if (typeof kinder_konten !== 'undefined' && kinder_konten.length > 0) {
            kinder_konten.forEach(kinder_konto =>{
                console.log('Kind:', kinder_konto.name)
                const child_content = content_dict[kinder_konten.id]
                if (typeof child_content !== "undefined") {
                    console.log('content')
                }else{
                    console.log('kein content')
                }
            })
        }
    });
    for (let i = max_depth - 1; i > 0; i--) {
        const konten_ebene = konten.filter(x => x.ebene === i);
        const elternkonten = [...new Set(konten_ebene.map(item => item.elternkonto))];
        elternkonten.forEach(elternkonto_id =>{
            const konto_gruppe = konten_ebene.filter(x => x.elternkonto === elternkonto_id)
            const childPanels = [];
            let j = 0;
            konto_gruppe.forEach(konto => {
                const konto_children = content_dict[konto.id]
                let child_content;
                if (typeof konto_children !== "undefined") {
                    child_content = konto_children;
                }else{
                    child_content = konto.name;
                }
                childPanels.push(
                    {
                        key: 'panel-' + j.toString(),
                        title: konto.name,
                        content: child_content
                    }
                )
                j++;
            })
            const ChildContent = (
                <div>
                    <Accordion.Accordion panels={childPanels} />
                </div>
            )
            content_dict[elternkonto_id] = { content: ChildContent };
        })
    }
    const konten_0 = konten.filter(x => x.ebene === 0);
    const childPanels = [];
    let j = 0;
    konten_0.forEach(konto =>{
        const konto_children = content_dict[konto.id]
                let child_content;
                if (typeof konto_children !== "undefined") {
                    child_content = konto_children;
                }else{
                    child_content = konto.name;
                }
                childPanels.push(
                    {
                        key: 'panel-' + j.toString(),
                        title: konto.name,
                        content: child_content
                    }
                )
                j++;
        })
    
    

    const childPanels = [];
    return childPanels
}

export class Konten extends Component {

    state = { activeIndex: -1 }

    static propTypes = {
        konten: PropTypes.array.isRequired,
        getKonten: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getKonten();
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state
        const konten = this.props.konten;
        const panels = rootPanels(konten);

        return (
            <Accordion
                activeIndex={activeIndex}
                panels={panels}
                styled
                onTitleClick={this.handleClick}
            />
        )
    }
}

const mapStateToProps = state => ({
    konten: state.konten.konten
});

export default connect(
    mapStateToProps,
    { getKonten }
)(Konten);
