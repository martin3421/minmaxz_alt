import React, { Component, Fragment } from 'react'
import { Accordion, Icon, List } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { getKonten } from "../../../actions/konten";

const item1 = (
    <List.Item key="1">Girokonto</List.Item>
)
const item2 = (
    <List.Item key="2">Bargeld</List.Item>
)
const item3 = (
    <List.Item key="3">Kreditkarte</List.Item>
)
const my_items = [item1, item2, item3];
const Level1aaContent = (
    <List>
        {my_items}
    </List>
)

const level1aPanels = [
    { key: 'panel-1ab', title: 'Girokonto', content: { content: Level1aaContent } },
]

const Level1aContent = (
    <List>
        <List.Item>Bargeld</List.Item>
        <List.Item><Accordion.Accordion panels={level1aPanels} /></List.Item>
    </List>
)

const level1Panels = [
    { key: 'panel-1a', title: 'Barvermögen', content: { content: Level1aContent } },
    { key: 'panel-ba', title: 'Geldanlagen', content: 'Level 1B Contents' },
]

function rootPanels(konten) {
    const max_depth = Math.max.apply(Math,konten.map(function(o){return o.ebene;}))
    const konto_max = konten.filter(x => x.ebene === max_depth);
    let content_dict = {};
    konto_max.forEach(konto => {
        const children = konten.filter(x => x.elternkonto === konto.id)
        if (typeof children !== "undefined") {
            const child_list = (
                <List>
                    {children.map(child => (
                        <List.Item key={child.id}>{child.name}</List.Item>
                    ))}
                </List>
            )
            const ChildContent = (
                <List>
                    {child_list}
                </List>
            )
            content_dict[konto.id] = { content: ChildContent };
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
                panels={level1Panels}
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
