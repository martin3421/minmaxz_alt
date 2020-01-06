import React, { Component, Fragment } from 'react'
import { Accordion, Button, List } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getKonten } from "../../../actions/konten";


function rootPanels(konten) {
    const max_depth = Math.max.apply(Math, konten.map(function (o) { return o.ebene; }))
    let content_dict = {};
    for (let i = max_depth - 1; i >= 0; i--) {
        const konten_ebene = konten.filter(x => x.ebene === i);
        konten_ebene.forEach(elternkonto => {
            const kinder_konten = konten.filter(x => x.elternkonto === elternkonto.id)
            let list_items = [];
            if (typeof kinder_konten !== 'undefined' && kinder_konten.length > 0) {
                kinder_konten.forEach(kinder_konto => {
                    const child_content = content_dict[kinder_konto.id]
                    if (typeof child_content !== "undefined") {
                        const child_panels = [
                            { key: `panel-${kinder_konto.id}`, title: kinder_konto.name, content: child_content },
                        ]
                        const list_item = (
                            <List.Item key={kinder_konto.id}>
                                <Accordion.Accordion panels={child_panels} />
                            </List.Item>
                        )
                        list_items.push(list_item)
                    } else {
                        const list_item = (
                            <List.Item key={kinder_konto.id}>
                                {kinder_konto.name}
                            </List.Item>
                        )
                        list_items.push(list_item)
                    }
                })
                const list_content = (
                    <List>
                        {list_items}
                    </List>
                )
                content_dict[elternkonto.id] = { content: list_content };
            }
        });
    }
    const level0Panels = [
        { key: 'panel-1', title: 'Aktiva', content: content_dict[1] },
        { key: 'panel-2', title: 'Anfangsbestand', content: content_dict[98] },
        { key: 'panel-3', title: 'Aufwendungen', content: content_dict[36] },
        { key: 'panel-4', title: 'Erträge', content: content_dict[25] },
    ]
    return level0Panels
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
            <Fragment>
                <Accordion
                    activeIndex={activeIndex}
                    panels={panels}
                    styled
                    onTitleClick={this.handleClick}
                />
                <Link to="/konto_neu">
                    <Button>Click Here</Button>
                </Link>

            </Fragment>
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
