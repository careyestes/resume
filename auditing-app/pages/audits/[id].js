import Head from 'next/head';
import Layout from '../../components/layout';
import styles from './audit.module.scss';
import classNames from 'classnames';
import React, { useState } from "react";

import { getAllPostIds, getPostData } from '../../lib/audits';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {

  const [issueCount, setIssueCount] = postData.issues.length ? React.useState(postData.issues.length) : "";
  const issueKey = postData.issues.length - 1
  const [showAddIssue, setShowAddIssue] = React.useState(false);
  const [siteSlug, updateSiteSlug] = React.useState(postData.slug)
  const [editingIssue, setEditingIssue] = React.useState(false);
  const [formUpdated, setforUpdated] = React.useState(false);

  

  function toggleIssue() {
    if(showAddIssue) {
      setShowAddIssue(false)
      // setIssueCount(issueCount - 1)
    } else {
      setShowAddIssue(true)
      // setIssueCount(issueCount + 1)
    }
  }

  function toggleEditingIssue() {
    if(editingIssue) {
      setEditingIssue(false)
    } else {
      setEditingIssue(true)
    }
  }

  function changeSiteName(e) {
    let name = e.target.value
    name = name.replaceAll(" ", "-")
    name = name.toLowerCase()
    updateSiteSlug(name)
  }

  return (
    <Layout location='post'>
      <Head>
        <title>Audit of {postData.sitename}</title>
      </Head>

      <form action="/api/form" method="post" className={styles.form}>
        <p className={styles.siteName}>
          <label htmlFor="sitename">Site Name: </label>
          <input id="sitename" name="sitename" type="text" className={ styles.siteDetails } defaultValue={postData.sitename} onChange={(e) => changeSiteName(e)} />
        </p>
        
        <p className={styles.slug}>
          <label htmlFor="slug">Slug: </label>
          <input id="slug" name="slug" type="text" readOnly value={siteSlug} />
        </p>
        
        <p>
          <label htmlFor="url">URL: </label>
          <input id="url" className={ styles.siteDetails } name="url" type="url" defaultValue={postData.url} />
          
          <label htmlFor="auditor">Auditor: </label>
          <input id="auditor" className={ styles.siteDetails } name="auditor" type="text" defaultValue={postData.auditor} />
          
          <label htmlFor="date">Date: </label>
          <input id="date" className={ styles.siteDetails } name="date" type="date" defaultValue={postData.date} />
        </p>
        
        <p>
          <label htmlFor="summary">Summary: </label>
          <textarea rows="1" id="summary" className={ styles.siteDetails } name="summary" defaultValue={postData.summary} />
        </p>

        <input type="hidden" readOnly name="issuenumber" value={postData.issues.length} />

        <div className={classNames(styles.issuesContainer, showAddIssue ? styles.shown : styles.hidden)}>
          <div className={classNames(styles.addIssueContainer, showAddIssue ? styles.shown : styles.hidden)}>
            
            <div className={styles.row}>
              <div className={styles.rowColumn}>
                <label htmlFor="tool">Tool</label>
                <div className={styles.select}>
                  <select id="tool" name={ "tool_" + issueCount }>
                    <option>Axe</option>
                    <option>Lighthouse</option>
                    <option>Wave</option>
                    <option>Manual</option>
                  </select>
                  <span className={styles.focus}></span>
                </div>
              </div>
              
              <div className={styles.rowColumn}>
                <label htmlFor="mode">Mode</label>
                <div className={styles.select}>
                  <select id="mode" name={ "mode_" + issueCount }>
                    <option>N/A</option>
                    <option>Navigation</option>
                    <option>Snapshot</option>
                  </select>
                  <span className={styles.focus}></span>
                </div>
              </div>

              <div className={styles.rowColumn}>
                <label htmlFor="severity">Severity</label>
                <input id="severity" type="range" name={ "severity_" + issueCount } min="0" max="100" step="10" />
              </div>

            </div>

            <div className={styles.row}>
              <div className={styles.rowColumn}>
                <label htmlFor="issue">Issue</label>
                <input required={showAddIssue} id="issue" type="text" name={ "issue_" + issueCount } />
              </div>
            </div>
            
            <div className={styles.row}>
              <div className={styles.rowColumn + ' ' + styles.alignTop}>
                <label htmlFor="description">Description</label>
                <textarea rows="2" id="description" name={ "description_" + issueCount } />
              </div>
            </div>
            
            <div className={styles.row}>
              <div className={styles.rowColumn + ' ' + styles.alignTop}>
                <label htmlFor="solution">Solution</label>
                <textarea rows="2" id="solution" name={ "solution_" + issueCount } />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.rowColumn}>
                <label htmlFor="pages">Page(s)</label>
                <input className={styles.small} id="pages" type="text" name={ "pages_" + issueCount } />
              </div>
            </div>

          </div>
        </div>
        
        <div className={styles.fixedBottom}>
          <button className={styles.cancelButton} type="button" onClick={toggleIssue}>{ showAddIssue ? "Cancel" : "Add an Issue" }</button>
          <button className={styles.saveButton} type="submit">Save</button>
        </div>

        <h2><span className={styles.issueCount}>{issueCount}</span> ISSUES</h2>
        
        <div className={styles.existingIssues}>
          
          {postData.issues.slice(0).reverse().map((item, index) => {
            
            const [ currentIndex, updateCurrentIndex ] = React.useState(index);

            return (
              <div className={classNames(styles.issueList, item.done === "on" ? styles.done : "")} key={index} data-id={currentIndex}>

                <div className={classNames(styles.checkboxRow)}>
                  
                  <label className={classNames(styles.checkboxRow, issueCount === 1 ? "hidden" : "")}>
                    <input id={ "isRemoved_" + currentIndex } type="checkbox" name={ "isRemoved_" + currentIndex } />
                    <span>Remove</span>
                  </label>
                
                  <label className={classNames(styles.checkboxRow)}>
                    <input id={ "isDone_" + currentIndex } type="checkbox" name={ "isDone_" + currentIndex } defaultChecked={"checked" ? item.done == "on" : ""}/>
                    <span>Done</span>
                  </label>
                
                </div>
                
                <div className={styles.row}>
                  <div className={styles.rowColumn}>
                      <label htmlFor={ "tool_" + currentIndex }>Tool</label>
                      <div className={styles.select}>
                        <select id={ "tool_" + currentIndex } name={ "tool_" + currentIndex } defaultValue={ item.tool }>
                          <option value="Axe">Axe</option>
                          <option value="Lighthouse">Lighthouse</option>
                          <option value="Wave">Wave</option>
                          <option value="Manual">Manual</option>
                        </select>
                        <span className={styles.focus}></span>
                      </div>
                  </div>

                  <div className={styles.rowColumn}>
                    <label htmlFor={ "mode_" + currentIndex }>Mode</label>
                    <div className={styles.select}>
                      <select id={ "mode_" + currentIndex } name={ "mode_" + currentIndex } defaultValue={ item.mode }>
                        <option value="N/A">N/A</option>
                        <option value="Navigation">Navigation</option>
                        <option value="Snapshot">Snapshot</option>
                      </select>
                      <span className={styles.focus}></span>
                    </div>
                  </div>

                  <div className={styles.rowColumn}>
                    <label htmlFor={ "severity_" + currentIndex }>Severity</label>
                    <input id={ "severity_" + currentIndex } type="range" name={ "severity_" + currentIndex } min="0" max="100" step="10" defaultValue={item.severity} />
                  </div>
                </div>
                
                <div className={styles.row}>
                  <div className={styles.rowColumn}>
                    <label htmlFor={ "issue_" + currentIndex }>Issue</label>
                    <input required id={ "issue_" + currentIndex } type="text" name={ "issue_" + currentIndex } defaultValue={item.issue} />
                    {/* <div className={classNames(styles.readOnly, editingIssue ? "hidden" : "")}>{item.issue}</div> */}
                    {/* <button className={ styles.inlineEdit } type="button" onClick={toggleEditingIssue}>Edit</button> */}
                  </div>
                </div>
                
                <div className={styles.row}>
                  <div className={styles.rowColumn + ' ' + styles.alignTop}>
                    <label htmlFor={ "description_" + currentIndex }>Description</label>
                    <textarea rows="2" id={ "description_" + currentIndex } name={ "description_" + currentIndex } defaultValue={item.description} />
                  </div>
                </div>
                
                <div className={styles.row}>
                  <div className={styles.rowColumn + ' ' + styles.alignTop}>
                    <label htmlFor={ "solution_" + currentIndex }>Solution</label>
                    <textarea rows="2" id={ "solution_" + currentIndex } name={ "solution_" + currentIndex } defaultValue={item.solution} />
                  </div>
                </div>
                
                <div className={styles.pagesContainer}>
                  <div className={styles.row}>
                    <div className={styles.rowColumn}>
                      <label htmlFor={ "pages_" + currentIndex }>Page(s):</label>
                      <input className={styles.small} id={ "pages_" + currentIndex } type="text" name={ "pages_" + currentIndex } defaultValue={item.pages} />
                    </div>
                  </div>              
                </div>
              </div>
            )
          })}
        
        </div>
        
      </form>
 
    </Layout>
  );
}