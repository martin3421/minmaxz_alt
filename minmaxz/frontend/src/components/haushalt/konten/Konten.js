import React, { Component, Fragment } from 'react'
import { Accordion, Icon, List } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { getKonten } from "../../../actions/konten";

const Level1aaContent = (
    <List>
        <List.Item>DKB</List.Item>
        <List.Item>Sparkasse</List.Item>
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

const Level1Content = (
    <div>
        <Accordion.Accordion panels={level1Panels} />
    </div>
)

const level2Panels = [
    { key: 'panel-2a', title: 'Level 2A', content: 'Level 2A Contents' },
    { key: 'panel-2b', title: 'Level 2B', content: 'Level 2B Contents' },
]

const Level2Content = (
    <div>
        <Accordion.Accordion panels={level2Panels} />
    </div>
)

function rootPanels(konten) {
    const konto_3 = konten.filter(x => x.ebene === 3);
    let content_dict = {};
    konto_3.forEach(konto => {
        const children = konten.filter(x => x.elternkonto === konto.id)
        if (typeof children !== "undefined") {
            const childPanels = [];
            let j = 0;
            for (const child of children) {
                childPanels.push(
                    {
                        key: 'panel-' + j.toString(),
                        title: child.name,
                        content: child.name
                    }
                )
                j++;
            }
            const ChildContent = (
                <div>
                    <Accordion.Accordion panels={childPanels} />
                </div>
            )
            content_dict[konto.id] = { content: ChildContent };
        }
    });
    for (let i = 2; i > 0; i--) {
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
