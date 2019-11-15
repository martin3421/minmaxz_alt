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
    let kontoPanels;
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
            console.log(content_dict)
            content_dict[konto.id] = { content: ChildContent };
        }
    });
    console.log(content_dict)
    //for (let i = 4; i > 0; i--) {
    //}


    return kontoPanels
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
